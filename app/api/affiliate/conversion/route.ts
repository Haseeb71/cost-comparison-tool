import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { calculateCommission } from "@/lib/affiliate-tracking"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, toolId, conversionType, conversionValue, metadata } = body

    if (!sessionId || !toolId || !conversionType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // Find the original click
    const { data: click, error: clickError } = await supabase
      .from("affiliate_clicks")
      .select("*")
      .eq("session_id", sessionId)
      .eq("tool_id", toolId)
      .order("clicked_at", { ascending: false })
      .limit(1)
      .single()

    if (clickError || !click) {
      return NextResponse.json({ error: "Original click not found" }, { status: 404 })
    }

    // Get tool information for commission calculation
    const { data: tool, error: toolError } = await supabase
      .from("tools")
      .select("affiliate_commission, name")
      .eq("id", toolId)
      .single()

    if (toolError || !tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 })
    }

    // Calculate commission
    const commissionAmount = tool.affiliate_commission
      ? calculateCommission(conversionValue || 0, tool.affiliate_commission)
      : 0

    // Insert conversion record
    const { data: conversion, error: conversionError } = await supabase
      .from("affiliate_conversions")
      .insert({
        click_id: click.id,
        tool_id: toolId,
        session_id: sessionId,
        conversion_type: conversionType,
        conversion_value: conversionValue,
        commission_amount: commissionAmount,
        metadata: metadata || {},
      })
      .select()
      .single()

    if (conversionError) {
      console.error("Error tracking conversion:", conversionError)
      return NextResponse.json({ error: "Failed to track conversion" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      conversionId: conversion.id,
      commissionAmount,
    })
  } catch (error) {
    console.error("Error in affiliate conversion API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
