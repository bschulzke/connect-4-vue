onmessage = (e) => {
    chooseMove(e);
}

async function chooseMove(e) {
    console.log("Recieved message from main script");
    let moves = e.data[0];
    let board = e.data[1];
    console.log("Recieved board from main script:" + board);
    await sleep(5000);
    console.log("Posting message back to main thread");
    postMessage(moves[Math.floor(Math.random() * moves.length)]);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}