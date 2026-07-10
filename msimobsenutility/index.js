#!/usr/bin/env node

/**
 * MSI Mobsen Utility
 * CLI tool for starting the msimobsen music application
 */

const command = process.argv[2];

if (command === 'start') {
  console.log('Starting MSI Mobsen utility...');
  // Add your utility logic here
} else if (command === 'help' || !command) {
  console.log(`
MSI Mobsen Utility

Usage: msimobsenutility [command]

Commands:
  start  - Start the utility
  help   - Show this help message
`);
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
