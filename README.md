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

### 1️⃣ WELCOME、ログイン／会員登録

<img src="https://github.com/user-attachments/assets/4832386f-9f72-4455-9022-21fbc45f25eb" width="900" />

- Word Master は、あなた専用の単語帳＆テストサイトです。🤗
- 右上のアイコンをクリックすると、ログイン画面に移動します。

<img src="https://github.com/user-attachments/assets/8ef60270-910d-4c3d-9f27-83adc055fb5a" width="700" />

- ログイン／会員登録 を切り替えることができます。
- Google アカウントでのログイン・登録が可能です。
- 入力内容に不備があると、エラーメッセージが表示されます。
- パスワード欄の👁️ボタンをクリックすると、入力したパスワードが表示されます。
- 入力がすべて正しい場合のみ、ボタンが有効になります
- ログイン／登録が成功すると、ホーム画面に移動します。

### 2️⃣ 「単語帳 & テスト」モードの選択（ホーム）

<img src="https://github.com/user-attachments/assets/e8421219-e16a-47e7-922e-229138c44dbc" width="900" />

- **単語帳（Voca）**
  - フォルダを作成して、自分の好きな形で単語帳を整理できます。
- **テスト**
  - テストしたい単語帳を選んで、繰り返し・ランダムテストができます。

### 3️⃣ 単語帳モード

<img src="https://github.com/user-attachments/assets/582afe4c-9ef1-4177-b97d-b3f155c9dc51" width="900" />

- フォルダ構造で、自由に単語帳を作成できます。
- フォルダーをクリックすると、その中に移動します。
- 単語帳をクリックすると、単語帳が開きます。

<img src="https://github.com/user-attachments/assets/f701907f-e96c-49a5-a0c2-9b787ad8d5ca" width="700" />

- ➕ボタンをクリックすると、新しいフォルダまたは単語帳の作成できます。

<img src="https://github.com/user-attachments/assets/36c48862-5301-4d6f-ab99-f5c9763ff674" width="700" />

- 🔽ボタンをクリックすると、名前の変更または削除ができます。

### 4️⃣ 単語帳の作成

<img src="https://github.com/user-attachments/assets/8dfdcf32-70f3-4bf7-9cca-9b28a59978aa" width="900" />

- 登録する単語を入力します。
- 「単語・意味・発音」、三つのフィールドがあります。
- 日本語の場合、漢字の発音も一緒に登録して、テストすることができます。

### 5️⃣ 単語帳

<img src="https://github.com/user-attachments/assets/eae5dc3a-7d4f-4143-bdda-29a62660edd4" width="900" />

- テストの前に、作成した単語帳を開いて学習します。
- また、「答えを隠す」機能で簡単にテストできます。

<img src="https://github.com/user-attachments/assets/2030bd11-e31e-48b2-bb0d-bb19f9a54ede" width="900" />

- 並び替えの基準を変更できます。

<img src="https://github.com/user-attachments/assets/7475621f-a7ce-48b3-a54a-1402a67cf041" width="900" />

<img src="https://github.com/user-attachments/assets/4d2682bf-8ae0-42cc-a1c9-7d4d1cda268e" width="900" />

- 「答えを隠す」機能を使うと、右側が隠され、🔽ボタンで答えを確認できます。

### 6️⃣ テストモード

<img src="https://github.com/user-attachments/assets/531a39be-4d19-45e9-ba52-40f918e90ce0" width="900" />

- テストしたい単語帳を複数選んで、繰り返し・ランダムテストができます。
- ➕ボタンをクリックすると、テスト作成画面に移動します。
- テストをクリックすると、テスト設定画面に移動します。

### 7️⃣ テストの作成

<img src="https://github.com/user-attachments/assets/25d279db-acfa-47c4-baab-5ae23a2c4366" width="900" />

<img src="https://github.com/user-attachments/assets/d87b822a-8ace-4747-a05b-68a8ef675df7" width="900" />

- 自分の単語帳フォルダ構造が下部に表示され、テストしたい単語帳をすべて選んで、テストを作成します。

### 8️⃣ テストの設定

<img src="https://github.com/user-attachments/assets/c64733c7-b3cc-49c6-a5d7-758337169beb" width="900" />

- テストを始める前に、設定を行います。
- タイマーも設定できます。
- 現在の達成率を確認できます。また、🔄️ボタンを通じてリセットすることもできます。

### 9️⃣ テスト

<img src="https://github.com/user-attachments/assets/2a533853-62a7-4975-9e50-7c336af87062" width="900" />

- 真ん中の単語カードを見て、知っている単語なら✔️（正解）ボタンを、知らないなら✖️（不正解）をクリックします。
- ✖️をクリックした単語は、後でランダムに再出題されます。
- タイマーを設定した場合、左下にタイマーが表示され、０秒になると▶（次へ）ボタンが現れます。
- 上部に達成率が表示されます。

<img src="https://github.com/matchlessNostril/WordMaster/assets/144131324/992571bf-c2ad-4a6f-93f0-465da0996147" width="100" />

- いつでも✖️ボタンをクリックしてテストを中断できます。
