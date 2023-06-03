import requests
from bs4 import BeautifulSoup
import pymysql
import pickle


class novel():
    con = pymysql.connect(
        host="localhost",
        port=3306,
        user="root",
        password="",
        db="novel",
        charset="utf8mb4"
    )
    # 创建游标对象
    mycursor = con.cursor()

    def __init__(self):
        self.url = "https://book.qidian.com/info/1036010291/#Catalog"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'}

    def send_request(self, url):
        resp = requests.get(url, headers=self.headers)
        if resp.status_code == 200:
            return resp

    def parse_html(self, resp):
        lst = []
        chapter = []
        html = resp.text
        soup = BeautifulSoup(html,"html.parser")
        h2 = soup.findAll("h2",class_="book_name")
        for item in h2:
            link = item.find("a")
            url = link["href"]
            title = link.text
            lst.append((url, title))
        for link , title in lst:
            link ='https:' +link
            response = requests.get(link,headers=self.headers)
            content = response.text
            soup = BeautifulSoup(content, "html.parser")
            # 这个储存的是小说章节的内容

            div = soup.find("div", class_="read-content j_readContent")
            div = div.text.replace("\u3000", " ")
            novel_id = 100
            chapter.append((novel_id,title,div))
        print(chapter)
        with open('chapterWX.pkl', 'wb') as f:
            pickle.dump(chapter, f)
        self.save(chapter)

    def save(self, chapter):
        # print(self.con)
        sql='INSERT INTO chapter (novel_id, chapter_title, content) VALUES (%s, %s, %s);'
        self.mycursor.executemany(sql,chapter)
        self.con.commit()
        print(self.mycursor.rowcount,"插入完毕")



    def load_and_save_chapter_data(self):
        with open('chapterWX.pkl', 'rb') as f:
            chapter_data = pickle.load(f)
        self.save(chapter_data)

    def start(self):
        # for i in range(1,2):
        #     full_url=self.url.format(i)
        url = self.url
        resp = self.send_request(url)
        # print(resp.text)
        self.parse_html(resp)

# if __name__ == '__main__':
#     novel = novel()
#     novel.load_and_save_chapter_data()

if __name__ == '__main__':
    novel = novel()
    novel.start()
