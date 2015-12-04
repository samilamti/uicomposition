ri -force -recurse ..\demo-runtime
git checkout demo-person
cp -recurse . ..\demo-runtime\person
pushd ..\demo-runtime\person
[System.Diagnostics.Process]::Start("cmd", "/k $env:LOCALAPPDATA\.meteor\meteor.bat")
popd