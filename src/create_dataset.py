# from datasets import load_dataset, Dataset, Audio
# import numpy as np
# import pandas as pd

# cree_dt = pd.read_csv("cree_english.csv", header=0)
# cree_dt["cree"] = cree_dt["cree"].str.lower()
# print(cree_dt)
    

# audio_path = "./assets/sounds/"
# audio_filenames = [
#     "after midnight.wav",
#     "apple.wav",
#     "apples.wav",
#     "at midnight.wav",
#     "at noon.wav",
#     "bread.wav",
#     "butter.wav",
#     "carrot.wav",
#     "carrots.wav",
#     "cheese.wav",
#     "day after tomorrow.wav",
#     "dime.wav",
#     "egg.wav",
#     "eight dollars.wav",
#     "fifty dollars.wav",
#     "five dollars.wav",
#     "four dollars.wav",
#     "ice cream.wav",
#     "in the morning.wav",
#     "jello.wav",
#     "juice.wav",
#     "last evening.wav",
#     "last night.wav",
#     "later tonight.wav",
#     "midnight.wav",
#     "milk.wav",
#     "morning.wav",
#     "nickel.wav",
#     "night.wav",
#     "nine dollars.wav",
#     "noon.wav",
#     "one dollar.wav",
#     "one hundred dollars.wav",
#     "onion.wav",
#     "onions.wav",
#     "orange.wav",
#     "oranges.wav",
#     "past midnight.wav",
#     "peach.wav",
#     "peaches.wav",
#     "pear.wav",
#     "pears.wav",
#     "pepper.wav",
#     "potato.wav",
#     "potatoes.wav",
#     "quarter.wav",
#     "rice.wav",
#     "salt.wav",
#     "seven dollars.wav",
#     "six dollars.wav",
#     "soup.wav",
#     "sugar.wav",
#     "tea.wav",
#     "ten dollars.wav",
#     "three dollars.wav",
#     "tomorrow.wav",
#     "tomorrow morning.wav",
#     "tonight.wav",
#     "twenty dollars.wav",
#     "two dollars.wav",
#     "water.wav",
#     "watermelon.wav",
#     "watermelons.wav",
#     "wine.wav"
# ]

# audio_files = []
# for name in audio_filenames:
#     audio_files.append(audio_path + name)
# # print(audio_files)

# id = np.arange(len(audio_files))
# # print(id)

# gender = ["female"]*len(audio_files)

# audio_dataset = Dataset.from_dict(
#     {   "audio_id": id,
#         "audio": audio_files,
#         "cree_transcription": cree_dt["cree"],
#         "english_transcription": cree_dt["english"],
#         "gender": gender}).cast_column("audio", Audio(sampling_rate = 16000))
# # audio_dataset = Dataset.from_dict(
# #     {   "audio_id": [0],
# #         "audio": ["./assets/sounds/orange.wav"],
# #         "cree_transcription": ["osawimin"],
# #         "english_transcription": ["orange"],
# #         "gender": ["female"]}).cast_column("audio", Audio(sampling_rate = 16000))

# print(audio_dataset[0])
# audio_dataset.push_to_hub("verayang/plainscree")
