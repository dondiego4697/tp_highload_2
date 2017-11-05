const os = require('os');

module.exports = function cpuLoader() {
    return cpuLoadInit();
};

function cpuAverage() {
    let totalIdle = 0;
    let totalTick = 0;

    const cpus = os.cpus();
    cpus.forEach(cpu => {
        Object.values(cpu.times).forEach(val => {
            totalTick += val;
        });
        totalIdle += cpu.times.idle;
    });

    const idle = totalIdle / cpus.length;
    const total = totalTick / cpus.length;

    return {
        idle,
        total
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function cpuLoadInit() {
    const start = cpuAverage();

    await timeout(100);
    let end = cpuAverage();

    const diff = {
        idle: end.idle  - start.idle,
        total: end.total - start.total,
    };

    diff.percent = 1 - diff.idle / diff.total;
    return diff;
}