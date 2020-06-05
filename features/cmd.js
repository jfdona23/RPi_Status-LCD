const util = require('util')
const exec = util.promisify(require('child_process').exec)

/*
# Timing function
const {performance} = require('perf_hooks')
startTime = performance.now()
function executingAt() {
    return (performance.now() - startTime) / 1000
  }
console.log(executingAt())
*/

async function cmdOutput(cmd) {
    var cmdTemp = 'vcgencmd measure_temp'
    var cmdTempOut

    var cmdMem = 'free -m | grep "Mem\:" |awk \'{print $7}\''
    var cmdMemOut

    var cmdDisk = 'df -h --sync --output=pcent / |grep -vi use'
    var cmdDiskOut

    try {
        var { stdout, stderr } = await exec(cmdTemp)
        cmdTempOut = parseInt(stdout.split('=')[1].split('\'')[0])
    } catch(e) {
        console.log(e)
    }

    try {
        var { stdout, stderr } = await exec(cmdMem)
        cmdMemOut = parseInt(stdout)/1024
    } catch(e) {
        console.log(e)
    }

    try {
        var { stdout, stderr } = await exec(cmdDisk)
        cmdDiskOut = stdout.trim()
    } catch(e) {
        console.log(e)
    }

    return {
      cpuTemp: cmdTempOut.toFixed(0),
      freeMem: cmdMemOut.toFixed(1),
      usedDisk: cmdDiskOut
    }
}


module.exports.cmdOutput = cmdOutput
