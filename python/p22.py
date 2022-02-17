from pathlib import Path

names = sorted([name[1:-1] for name in Path("../data/p022_names.txt").read_text().split(",")])
result = sum([(names.index(name) + 1) * sum([(ord(c) - ord("A") + 1) for c in name]) for name in names])
print(result)
