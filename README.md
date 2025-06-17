# Transforming Desktop Browsing Experience: A Proof of Concept

## Preview

![demo](./demo1.webp)

## Overview

The "Link In Same Page" extension is a proof of concept designed to allow users to browse the web within the same browser tab, instead of opening new tabs for each link. This approach aims to streamline web interaction by consolidating content into a single, navigable panel within the user's current tab.

However, it's important to note that some websites may not load correctly within the extension's iframe due to security restrictions placed by the site owners to prevent their pages from being displayed within iframes. While this limits functionality somewhat, the concept demonstrates potential for more integrated browsing experiences in environments where iframe restrictions are lifted.

## Security Concerns

While the "Link In Same Page" extension provides a unique browsing experience, it also raises several security concerns:

- **Clickjacking**: The use of iframes can potentially expose users to clickjacking attacks, where malicious links may be overlaid transparently over seemingly benign content.
- **Phishing Risks**: Displaying content in iframes can obscure the actual origin of the content, potentially making it easier for malicious entities to mislead users about the authenticity of information, increasing the risk of phishing.
- **Cross-Site Scripting (XSS)**: If not properly sanitized, embedding content from external sites via iframes can lead to XSS attacks, allowing attackers to execute malicious scripts in the context of the user's session.

There might be other exploits as well, so keep in mind that this extension is for Proof of Concept purpose only.
