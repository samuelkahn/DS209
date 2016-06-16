from collections import Counter
with open('git_commit_history') as filename:
	lines=filename.readlines()
lines=map(lambda x:x[8:-21],lines)
counter= Counter(lines)
print counter.values()