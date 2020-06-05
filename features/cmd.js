const { exec } = require('child_process')

//var stderr
//var stdout

/*
# Timing function
const {performance} = require('perf_hooks')
startTime = performance.now()
function executingAt() {
    return (performance.now() - startTime) / 1000
  }
console.log(executingAt())
*/

function cmdOutput(err, stdout, stderr) {
    if (err) {
        console.log('It was an error: ' + err)
        return
    }
    
    //stderr = stderr
    //stdout = stdout
    console.log('stdout: \n' + stdout)
    console.log('stderr: \n' + stderr)
    return
}

function myExec() {
    exec('vcgencmd measure_temp', cmdOutput)
    return
}

myExec()
module.exports.myExec = myExec
