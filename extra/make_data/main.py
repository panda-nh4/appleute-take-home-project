import random,json,time
from duckduckgo_images_api import search
not_done=[]
names_list=[]
count=0
categories=['Electronics','Home','Lifestyle','Fashion','Books','Fitness','Movies','Health']
with open('names.txt','r') as f:
    for line in f.readlines():
        count+=1
        print("Product "+str(count))
        try:
            products={}
            products['name']=line.strip()
            products['price']=(random.randrange(5,300, 1))
            results = search(line.strip())
            products['img_link']=results["results"][0]['thumbnail']
            products['description']="Description about "+ line.strip()
            num_cat=(random.randrange(1,8, 1))
            products['category']=list(set(random.choices(categories,k=num_cat)))
            names_list.append(products)
            time.sleep(1)
        except Exception as e:
            print(e)
            not_done.append(count)



with open("productdetails.json",'w+') as f:
    jsonString = json.dumps(names_list, indent=4)
    f.write(jsonString)
        


