from polyscript import xworker

# will log 1 and "two" in default stdout console
xworker.sync.from_main(1, "two")