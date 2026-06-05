$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$node = "C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$log = Join-Path $root "server.log"

Set-Location $root
"Starting server at $(Get-Date -Format s)" | Out-File -FilePath $log -Encoding utf8 -Append
& $node (Join-Path $root "server.js") 2>&1 | Out-File -FilePath $log -Encoding utf8 -Append
