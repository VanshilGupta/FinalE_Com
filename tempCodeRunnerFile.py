def funWithAnagrams(text):
    # Write your code here
    i=0
    a = len(text)
    print(text[i+1])
    while(i<a-1):
        print('a is,', a)
        print('i is,',i )
        if(sorted(text[i+1]) == sorted(text[i])):
            del text[i+1]
            i-=1
            a-=1
        i+=1
    return text

print(funWithAnagrams(["code","aaagmnrs","anagrams","doce"]))
print(sorted(["code","cpagmnrs","anagrams","doce"]))