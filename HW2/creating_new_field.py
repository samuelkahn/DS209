import csv
import pandas as pd

data = pd.DataFrame.from_csv('Dating.csv')

print data.columns.values



def converter(row):
	if row=='Yes':
		row=0
	elif row=='No':
		row=1
	elif row=="Don't know":
		row = 2
	elif row =='Refused':
		row = 3
	else:
		row = 4
	return row

data['have_smart_phone'] = data['have_smart_phone'].apply(converter)
data['searched_for_ex_online'] = data['searched_for_ex_online'].apply(converter)
data['use_email'] = data['use_email'].apply(converter)
data['googled_own_name'] = data['googled_own_name'].apply(converter)
data['use_reddit'] = data['use_reddit'].apply(converter)
data['use_twitter'] = data['use_twitter'].apply(converter)

data.to_csv('Dating.csv')



print data