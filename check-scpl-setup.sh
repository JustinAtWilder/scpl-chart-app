#!/bin/bash

echo "🔍 Checking SCPL Chart App setup..."

# 1. Check for index.html in root
if [ -f "index.html" ]; then
  echo "✅ Found index.html in root"
else
  echo "❌ index.html missing in project root"
fi

# 2. Check vite.config.ts exists and contains base
if [ -f "vite.config.ts" ]; then
  if grep -q "base: \"/scpl-chart-app/\"" vite.config.ts; then
    echo "✅ vite.config.ts has correct base path"
  else
    echo "⚠️ vite.config.ts missing or incorrect base path"
  fi
else
  echo "❌ vite.config.ts not found"
fi

# 3. Check app/root.tsx exists
if [ -f "app/root.tsx" ]; then
  if grep -q "HashRouter" app/root.tsx; then
    echo "✅ root.tsx uses HashRouter"
  else
    echo "⚠️ root.tsx does not use HashRouter"
  fi
else
  echo "❌ app/root.tsx not found"
fi

# 4. Check app/routes.tsx exists
if [ -f "app/routes.tsx" ]; then
  if grep -q "Routes" app/routes.tsx && grep -q "Route" app/routes.tsx; then
    echo "✅ routes.tsx has Routes/Route setup"
  else
    echo "⚠️ routes.tsx missing Routes/Route setup"
  fi
else
  echo "❌ app/routes.tsx not found"
fi

# 5. Check that route components exist
for comp in home ela hs-rates; do
  if [ -f "app/routes/$comp.tsx" ]; then
    echo "✅ Found app/routes/$comp.tsx"
  else
    echo "❌ Missing app/routes/$comp.tsx"
  fi
done

# 6. Check package.json for react-router-dom
if grep -q "\"react-router-dom\"" package.json; then
  echo "✅ react-router-dom dependency found"
else
  echo "❌ react-router-dom dependency missing"
fi

echo "🔍 Check complete!"
