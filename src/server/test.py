from email.mime import base
import re


# def f1(kit): return kit - 1 
# def f2(kit): return kit // 2 + int((kit % 2) == 1)

# def checkValid(a, b):
#    ans = (f1(a) + b <= 20 or a + f1(b) <= 20 or f2(a) + b <= 20 or a + f2(b) <= 20)
#    return not ans


# def deeply(a, b, step, init, order):
#    if step == 0 or step == 1: 
#       if not checkValid(a, b): return
   
#    if step == 3:
#       if a + b <= 20: print(init, order)
#       return

#    if step == 1:
#       if a < b:
#          deeply(a, f1(b), step + 1, init, order + '   ' + str(f1(a) + b) + '  ')
#          return
#       deeply(f1(a), b, step + 1, init, order + '   ' + str(a + f1(b)) + '  ')
#       return
         
   
#    deeply(f1(a), b, step + 1, init, order + '   ' + str(f1(a) + b) + '  ')
#    deeply(a, f1(b), step + 1, init, order + '   ' + str(a + f1(b)) + '  ')
#    deeply(f2(a), b, step + 1, init, order + '   ' + str(f2(a) + b) + '  ')
#    deeply(a, f2(b), step + 1, init, order + '   ' + str(a + f2(b)) + '  ')

# for num in range(11, 50):
#    deeply(10, num, 0, num, '')

import copy
from stat import FILE_ATTRIBUTE_HIDDEN

file = open("C:/Users/79814/Downloads/24.txt")
# data = [str for str in file.read()]

# data = [int(num) for num in file.read().split("\n") if num != "" and len(num.split(" ")) == 1]
data = [num for num in file.read().split("\n")]

def find(array, item):
   step = len(array) // 2
   point = len(array) // 2 
   num = array[point]
   ans = num == item
   counterStepOfOne = 0
   while num != item and counterStepOfOne <= 2:
      if step == 1: counterStepOfOne += 1
      step //= 2
      if step == 0: step += 1
      num = array[point]
      if num == item: ans = True
      if item > num: point += step
      if item < num: point -= step
   
   return ans

def toBase(num, base):
   res = []
   while num >= base:
      res.append(num % base)
      num //= base

   res.append(num)
   res.reverse()
   resStr = ""
   for char in res: resStr += str(char)

   return resStr

totalNCounter = -1
totalStr = ""

for string in data:
   if string == "": continue
   curNCounter = 0
   for char in string: 
      if char == "N": curNCounter += 1
   if curNCounter < totalNCounter or totalNCounter == -1:
      totalNCounter = curNCounter
      totalStr = string

#сортирую строку
sortOperationArray = []
for char in totalStr: sortOperationArray.append(char)
sortOperationArray.sort()
totalStr = ""
for char in sortOperationArray: totalStr += char

counterChars = {}
for char in totalStr:
   if not (char in counterChars): counterChars[char] = 0
   counterChars[char] += 1

maxChars = 0
for char in counterChars:
   if maxChars < counterChars[char]: maxChars = counterChars[char] 

for char in counterChars:
   if maxChars == counterChars[char]: print(char) 

num = 452022
numCounter = 0
while True:
   for div in range(2, int(num**0.5)):
      if num % div == 0:
         M = div + num / div
         break;
   if M % 7 == 3:
      numCounter += 1
      print(num, int(M))

   if numCounter == 5: break;
   num += 1