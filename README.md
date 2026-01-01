## 💻 背景

- 日本語の単語を暗記する過程で、さまざまな不便さを感じてきました。

- まず、暗記のたびにテスト用紙を新しく作成する必要があり、その作業が煩雑でした。また、すでに作成したテスト用紙を再利用すると、問題の順番を覚えてしまい、暗記の効果が下がってしまうという課題がありました。

- さらに、一度暗記した単語もすぐに忘れてしまうため、繰り返しテストを行うことが重要でしたが、復習が必要な単語が増え続け、テスト用紙を作成すること自体が次第に負担になっていきました。

- こうした不便さを解消するため、「問題 - 正解」形式でテストを作成できる **Quizlet** のようなサービスを利用してみましたが、発音を別の項目として登録できない点に物足りなさを感じました。

- 漢字を見て意味と発音を同時に思い出す必要があり、また意味を見て漢字と発音を思い出す必要もありますが、発音を漢字と同じフィールドに登録すると、漢字の暗記に集中しにくいという問題がありました。

- そこで、これらの課題を解決するため、日本語の単語暗記に最適化した単語帳・テストサービスを作ろうと考えました。

## 🕐 開発期間

- `24.01 - 24.02` + `25.11`

## 📚 技術スタック

<div>
	<img src="https://img.shields.io/badge/React.js-61DAFB?style=flat&logo=react&logoColor=white" />
	<img src="https://img.shields.io/badge/Material UI-007FFF?style=flat&logo=mui&logoColor=white" />
	<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=Firebase&logoColor=white"" />
</div>

## ✔️ 対応デバイス

- `Desktop`
- `Laptop`
- `Tablet`
- `Mobile`

## ⭐️ メインフロー

### 1. 単語帳の登録

<img width="768" height="459" alt="image" src="https://github.com/user-attachments/assets/64da5ae2-f4ca-4966-b834-9044e4082d77" />

- 暗記中の単語帳を WordMaster に登録してください。
  
<img width="768" height="459" alt="image" src="https://github.com/user-attachments/assets/f09f0fb2-fa95-48e6-8ed4-4f1ebfebf73a" />

- フォルダ機能を利用して、単語帳を体系的に管理できます。
  
### 2. テスト

<img width="768" height="459" alt="image" src="https://github.com/user-attachments/assets/a1277786-489f-4712-a717-32bddcc1671c" />

- 一緒に暗記する単語帳を選択し、テストを作成してください。

<img width="768" height="459" alt="image" src="https://github.com/user-attachments/assets/adc1fe69-31bc-4c8d-851c-37fbe56c1484" />
<img width="768" height="459" alt="image" src="https://github.com/user-attachments/assets/1f44305e-0f1a-4f2c-a5a5-d35682acb34c" />

- テストオプションを設定した後、ランダムに出題されるテストを通して、単語を確実に暗記しましょう。カードをめくると正解が表示されます。


## 📌 詳細画面・機能

- [サイトへ](https://wordmaster-6c8d8.web.app)
- **テスト用アカウント**（データはバックアップされていますので、ご自由にお試しください。）
	- Email : test555@example.com
 	- Password : password555! 

### 1. WELCOME、ログイン／会員登録

<img width="768" height="459" alt="image" src="https://github.com/user-attachments/assets/8a64506c-67db-48b6-92b0-2fd7cfa29291" />

- Word Master は、あなた専用の単語帳＆テストサイトです。
- 右上のアイコンをクリックすると、ログイン画面に遷移します。

<img width="768" height="700" alt="image" src="https://github.com/user-attachments/assets/997b7c5a-fd1f-4d91-8ae8-32db7213559c" />

- Google アカウントでログイン・登録できます。
- 入力内容に不備がある場合、エラーメッセージが表示されます。
- パスワード欄の 👁️ ボタンをクリックすると、入力したパスワードが表示されます。
- すべての入力が正しい場合のみ、ボタンが有効になります。

### 2. 「単語帳 & テスト」 モードの選択

<img width="768" height="459" alt="image" src="https://github.com/user-attachments/assets/040e20c2-0160-428e-8389-d6e0523962d3" />

- **「単語帳」モード**：暗記中の単語帳を体系的に登録・管理します。
- **「テスト」モード**：一緒に暗記する単語帳を選択してテストを作成し、ランダムに出題されるテストを通して単語を暗記します。

### 3. 「単語帳」モード

<img width="768" height="918" alt="image" src="https://github.com/user-attachments/assets/75af54e2-4a8a-43d3-aa80-e98ccb64d66a" />

- フォルダ構造で、単語帳を体系的に登録・管理できます。
- フォルダをクリックすると、該当フォルダ内に移動します。

<img width="768" height="600" alt="image" src="https://github.com/user-attachments/assets/c4410dc9-54f7-4b57-b4e5-a251623e4129" />

- 🔽 ボタンをクリックすると、フォルダまたは単語帳の名前を変更・削除できます。

<img width="768" height="350" alt="image" src="https://github.com/user-attachments/assets/751bd340-5863-44a9-8119-b61f8a24a12d" />

- ➕ ボタンをクリックすると、新しいフォルダまたは単語帳を作成できます。
- **新規単語帳を作成**ボタンを押すと、単語入力画面に遷移します。

<img width="768" height="459" alt="image" src="https://github.com/user-attachments/assets/740a1476-4d19-4498-b0d8-28278d566b74" />

- 各単語は **単語・意味** の入力が必須で、**発音・説明・例文** は必要に応じて追加できます。

<img width="768" height="459" alt="image" src="https://github.com/user-attachments/assets/ff48d208-a9c7-4bb9-a502-df155f9cb6a4" />

- 単語帳をクリックすると、該当する単語帳画面に遷移します。

<img width="768" height="459" alt="image" src="https://github.com/user-attachments/assets/b096e153-6de5-4c86-9572-c165492c6071" />

- **単語** または **意味** を基準に並び替えができ、**答えを隠す**機能を使って、テスト前に単語帳ごとの簡単な暗記が可能です。

### 4. 「テスト」モード


