source ./.env
echo "Processing: $CYC_DIR"

npx cyclomatic-complexity "$CYC_DIR/src/**/*.ts" --exclude "$CYC_DIR/src/**/*.spec.ts" --threshold-warnings 15 --threshold-errors 25 --json > "./public/data.json"

# Timestamped backup of report
cp "./public/data.json" "./public/data-$(date +%Y%m%d)_$(date +%H%M%S).json"
