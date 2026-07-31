param(
  [string]$OutputPath = "personal-search-router.xpi"
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression

$root = $PSScriptRoot
$files = @(
  "manifest.json",
  "router.js",
  "options.html",
  "options.js",
  "options.css",
  "README.md",
  "icons/addon-icon-128.png",
  "icons/addon-icon-512.png"
)

$target = Join-Path $root $OutputPath
if (Test-Path -LiteralPath $target) {
  Remove-Item -LiteralPath $target
}

$zip = [System.IO.Compression.ZipFile]::Open($target, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($file in $files) {
    $source = Join-Path $root $file
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $source, $file.Replace("\\", "/")) | Out-Null
  }
}
finally {
  $zip.Dispose()
}

Write-Output "Created $target"
