
$ErrorActionPreference = "Stop"

Write-Host "1. Building project..." -ForegroundColor Cyan
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
npm run build
if ($LASTEXITCODE -ne 0) { 
    Write-Error "Build failed!"
    exit $LASTEXITCODE 
}

Write-Host "2. Navigating to dist folder..." -ForegroundColor Cyan
Set-Location dist

Write-Host "3. Initializing temporary git repo for deployment..." -ForegroundColor Cyan
git init
# Fix for "RPC failed; HTTP 408" and connection timeouts
# Increases the buffer size to 500MB to handle larger uploads
git config http.postBuffer 524288000
# Disables low speed limit check to prevent timeout on slow connections
git config http.lowSpeedLimit 0
git config http.lowSpeedTime 999999

git checkout -b gh-pages

Write-Host "4. Adding files..." -ForegroundColor Cyan
git add -A

Write-Host "5. Committing..." -ForegroundColor Cyan
git commit -m 'deploy'

Write-Host "6. Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "IMPORTANT: If asked to login, please check for a browser popup or your taskbar!" -ForegroundColor Yellow
$repoUrl = "https://github.com/Wissem7155hack/Lujan-landscaping.git"

# Attempt push, if it fails, try a deeper shallow clone trick or just retry
try {
    git push -f $repoUrl gh-pages
}
catch {
    Write-Warning "Push failed. Retrying with different settings..."
    git config http.version HTTP/1.1
    git push -f $repoUrl gh-pages
}

Write-Host "SUCCESS! Deployment complete." -ForegroundColor Green
Set-Location ..
