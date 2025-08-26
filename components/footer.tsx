export function Footer() {
  const footerSections = {
    'ToolsHub': {
      description: 'Honest comparisons. Real clarity.',
      links: []
    },
    'Explore': [
      'Categories',
      'Compare', 
      'Blog (soon)'
    ],
    'Company': [
      'About',
      'Contact'
    ],
    'Legal': [
      'Affiliate Disclosure',
      'Privacy',
      'Terms'
    ]
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">ToolsHub</h3>
            <p className="text-gray-400 text-sm">
              Honest comparisons. Real clarity.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Compare</a></li>
              <li><span className="text-gray-500 text-sm">Blog (soon)</span></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Affiliate Disclosure</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2024 ToolsHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}