# Link In Same Page Extension

## Overview

The "Link In Same Page" extension is a proof of concept designed to allow users to browse the web within the same browser tab, instead of opening new tabs for each link. This approach aims to streamline web interaction by consolidating content into a single, navigable panel within the user's current tab.

However, it's important to note that some websites may not load correctly within the extension's iframe due to security restrictions placed by the site owners to prevent their pages from being displayed within iframes. While this limits functionality somewhat, the concept demonstrates potential for more integrated browsing experiences in environments where iframe restrictions are lifted.

## Security Concerns

While the "Link In Same Page" extension provides a unique browsing experience, it also raises several security concerns:

- **Clickjacking**: The use of iframes can potentially expose users to clickjacking attacks, where malicious links may be overlaid transparently over seemingly benign content.
- **Phishing Risks**: Displaying content in iframes can obscure the actual origin of the content, potentially making it easier for malicious entities to mislead users about the authenticity of information, increasing the risk of phishing.
- **Cross-Site Scripting (XSS)**: If not properly sanitized, embedding content from external sites via iframes can lead to XSS attacks, allowing attackers to execute malicious scripts in the context of the user's session.

These risks suggest that while the extension offers innovative browsing capabilities, users should proceed with caution, particularly on untrusted or unknown websites.

## Installation Notes

To install the "Link In Same Page" extension in Google Chrome, follow these steps to load it as an unpacked extension:

1. **Download the Extension**: Clone or download the extension files to your local machine.

2. **Open Chrome Extensions Page**: Navigate to `chrome://extensions/` in your Google Chrome browser.

3. **Enable Developer Mode**: At the top right of the Extensions page, toggle the "Developer mode" switch to enable developer features.

4. **Load Unpacked Extension**: Click the "Load unpacked" button that appears after you enable Developer mode. This opens a file dialog.

5. **Select the Extension Directory**: Navigate to where you saved the unpacked extension files on your computer and select the main folder of the extension. Chrome will process the contents and load the extension into your browser.

6. **Ensure Proper Permissions**: Check that the extension has the necessary permissions to run. Adjust settings as necessary from the extensions menu.

By following these steps, you should be able to successfully load and start using the "Link In Same Page" extension to explore its capabilities and limits in browsing web content within a single tab.
