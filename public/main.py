from polyscript import XWorker
from pyscript import document
import numpy as np

def spawn_worker(event):
    print("Spawning worker...")
    sync = XWorker('./Player.py').sync
    sync.make_move = make_move
    sync.get_board = get_board

def make_move(colIndex):
    div = document.querySelector("#c" + str(colIndex))
    div.click()

def get_board():
    board = np.zeros([6,7]).astype(int)
    for r in range(6):
        for c in range(7):
            input_tag = document.querySelector("#a" + str(c) + str(r))
            board[r,c] = input_tag.value
    return board