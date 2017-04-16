function Wait-Invoke(
    [ScriptBlock]$script,
    [Parameter(ValueFromPipeline=$true)][Microsoft.PowerShell.Host.ISE.PowerShellTab]$tab) {
    While (-not $tab.CanInvoke) {
        Start-Sleep -m 100
    }

    $tab.Invoke($script)    
}

function Execute-InNewTab([String] $tabName, [ScriptBlock]$script) {
    $newTab = $psise.PowerShellTabs.Add()
    $newTab.DisplayName = $tabName
    $newTab | Wait-Invoke $script
}

Execute-InNewTab 'testrpc' { testrpc }

Execute-InNewTab 'web server' { 
    Set-Location 'D:\Repos\open-journal';
    truffle serve;
    }

Execute-InNewTab 'webpack watch' { 
    Set-Location 'D:\Repos\open-journal';
    webpack --progress --colors --watch;
}
