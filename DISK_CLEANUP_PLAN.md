# 🧹 Disk Cleanup Plan for Kimmi's System

## 🚨 **Critical Issue**: C: Drive 97.46% Full (1.46GB free / 57.33GB)

### **Immediate Actions (High Priority)**

#### 1. **Find and Remove Duplicate Desktop Folders**
```powershell
# Find all Desktop folders
Get-ChildItem -Path C:\Users -Recurse -Directory -Name "Desktop" | ForEach-Object { Get-ChildItem "C:\Users\$_" -Recurse | Measure-Object -Property Length -Sum }

# Check for duplicate Desktop locations
Get-ChildItem -Path C:\ -Recurse -Directory -Name "Desktop" -ErrorAction SilentlyContinue
```

#### 2. **Clear System Temporary Files**
```powershell
# Clear Windows temp files
Remove-Item -Path "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "C:\Windows\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue

# Clear user temp files
Remove-Item -Path "$env:LOCALAPPDATA\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
```

#### 3. **Clear Browser Cache and Downloads**
```powershell
# Chrome cache
Remove-Item -Path "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Cache\*" -Recurse -Force -ErrorAction SilentlyContinue

# Edge cache
Remove-Item -Path "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Cache\*" -Recurse -Force -ErrorAction SilentlyContinue

# Downloads folder cleanup
Get-ChildItem -Path "$env:USERPROFILE\Downloads" -File | Where-Object {$_.LastWriteTime -lt (Get-Date).AddDays(-30)} | Remove-Item -Force
```

#### 4. **Clear Node.js and NPM Cache**
```powershell
# NPM cache
npm cache clean --force

# Clear global npm modules
Remove-Item -Path "$env:APPDATA\npm-cache" -Recurse -Force -ErrorAction SilentlyContinue
```

#### 5. **Find Large Files and Duplicates**
```powershell
# Find files larger than 100MB
Get-ChildItem -Path C:\ -Recurse -File | Where-Object {$_.Length -gt 100MB} | Select-Object FullName, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}} | Sort-Object "Size(MB)" -Descending

# Find duplicate files by size and name
Get-ChildItem -Path C:\Users\kimmi -Recurse -File | Group-Object Name, Length | Where-Object Count -gt 1 | Select-Object Name, Count, @{Name="Size(MB)";Expression={[math]::Round($_.Group[0].Length/1MB,2)}}
```

### **Medium Priority Cleanup**

#### 6. **Clear System Restore Points**
```powershell
# Disable system restore temporarily to free space
vssadmin delete shadows /all /quiet
```

#### 7. **Clear Windows Update Cache**
```powershell
# Clear Windows Update downloads
Stop-Service -Name wuauserv -Force
Remove-Item -Path "C:\Windows\SoftwareDistribution\Download\*" -Recurse -Force
Start-Service -Name wuauserv
```

#### 8. **Clear Recycle Bin**
```powershell
# Empty all recycle bins
Clear-RecycleBin -Force -ErrorAction SilentlyContinue
```

### **Project-Specific Cleanup**

#### 9. **Clean Development Folders**
```powershell
# Clear node_modules in all projects
Get-ChildItem -Path C:\Users\kimmi -Recurse -Directory -Name "node_modules" | ForEach-Object { Remove-Item -Path $_ -Recurse -Force }

# Clear .next build folders
Get-ChildItem -Path C:\Users\kimmi -Recurse -Directory -Name ".next" | ForEach-Object { Remove-Item -Path $_ -Recurse -Force }

# Clear package-lock.json files (will be regenerated)
Get-ChildItem -Path C:\Users\kimmi -Recurse -File -Name "package-lock.json" | Remove-Item -Force
```

#### 10. **Move Large Projects to D: Drive**
```powershell
# Move development projects to D: drive
New-Item -Path "D:\Development" -ItemType Directory -Force
# Move large projects manually to D:\Development
```

### **Safe Cleanup Tools**

#### 11. **Use Built-in Disk Cleanup**
```powershell
# Run Windows Disk Cleanup
cleanmgr /sagerun:1
```

#### 12. **Use Storage Sense**
```powershell
# Enable and run Storage Sense
Get-WmiObject -Class Win32_Volume | Where-Object {$_.DriveType -eq 3} | ForEach-Object { 
    $_.DefragAnalysis() 
}
```

### **Expected Space Recovery**

| Action | Expected Space Freed |
|--------|---------------------|
| Temp files cleanup | 2-5 GB |
| Browser cache | 1-3 GB |
| Node.js cache | 500MB - 1GB |
| Duplicate files | 1-10 GB |
| System restore points | 2-8 GB |
| Windows Update cache | 1-5 GB |
| Recycle bin | 500MB - 2GB |
| **Total Expected** | **8-34 GB** |

### **After Cleanup Actions**

1. **Move Development to D: Drive**
   - Move all development projects to D:\Development
   - Update paths in IDEs and terminals

2. **Set Up Automated Cleanup**
   ```powershell
   # Create scheduled task for weekly cleanup
   $action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-File C:\Scripts\cleanup.ps1"
   $trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At 2AM
   Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "Weekly Cleanup"
   ```

3. **Monitor Disk Space**
   ```powershell
   # Create disk space monitor
   Get-WmiObject -Class Win32_LogicalDisk | Where-Object {$_.FreeSpace -lt 5GB} | Send-MailMessage -To "kimmi@email.com" -Subject "Low Disk Space Alert"
   ```

### **Priority Order for Execution**

1. **IMMEDIATE** (Run now):
   - Clear temp files
   - Clear browser cache
   - Clear npm cache
   - Empty recycle bin

2. **NEXT** (Run after immediate):
   - Find and remove duplicate files
   - Clear system restore points
   - Clear Windows Update cache

3. **THEN** (Run after above):
   - Move projects to D: drive
   - Clean development folders
   - Set up monitoring

Would you like me to start with the immediate cleanup actions?
