npm run build
zip -r deploy.zip . -x "node_modules/*" ".next/*"
