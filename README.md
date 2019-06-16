# Google Calendar を CSV 保存する GAS/TypeScript サンプルコード

* Google カレンダーの予定をスプレッドシート (延いては CSV) に保存するサンプルコード
* GAS (Google Apps Script) 開発には clasp で TypeScript を利用
* 後のピボットテーブルでの分析の便宜のため、年月、週番号や時間も合わせて出力
  - 会議時間の分析が目的であるため、一日単位のスケジュールは出力を省いている

__(参考) 出力されたデータをピボットテーブルでグラフにした例__

<p align="center">
<img src="sample_screenshot.png" width="600">
</p>


## Setup Node.js, TypeScript compiler and Clasp

* `.bashrc` に `export PATH=./node_modules/.bin:$PATH` しておくと便利

```bash
# brew は Mac 用 (Windows 用なら代わりに chocolatey 等を適宜利用)
brew update && brew upgrade && brew cask upgrade
brew install nodenv
echo 'eval "$(nodenv init -)"' >> ~/.bashrc

nodenv versions
nodenv install 10.16.0
nodenv global 10.16.0
node --version
> v10.16.0

npm install -g typescript
# need restart bash
tsc --version
> Version 3.5.2

npm init -y
npm install --save-dev @google/clasp tslint
npm install --save @types/google-apps-script
clasp --version
> 2.1.0
tslint --init
```

* 推奨開発環境は VSCode (設定の手間なくコード補完やフォーマットをしてくれる)
  - `brew cask install visual-studio-code`
* MS 公式 TSLint プラグインをインストールしておく
  - https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin
* `tsconfig.json` をドキュメントに従って作成する
  - https://github.com/google/clasp/blob/master/docs/typescript.md

```bash
# 初期設定 GAS API を ON (初回のみ実行)
open https://script.google.com/home/usersettings
clasp login
```


## Run

* GUI 上から新規 Apps Script プロジェクトを作成
* プロジェクトを開き `ファイル > プロジェクトのプロパティ` からスクリプトIDを確認
* `.clasp.json.sample` の `scriptId` を適宜書き換え `.clasp.json` とする
* 上記によりプロジェクトとの紐付けされ、本コードを push すれば実行可能になるはず
* Code.ts 内 main の Calendar ID 等の変数を適宜変更し main を実行する
  - calendar ID は通常はメールアドレス、sheetKey はスプレッドシートのURLにある


## Development

* (参考) 新規 Apps Script プロジェクト作成コマンド例

```bash
clasp create --type standalone --title "GCal-Save-Events" --rootDir ./dist
clasp pull
# デフォルトで作成される Code.js は .ts にリネームして利用する
```

* プロジェクト作成後の開発サイクル
  - `.ts` を編集後そのまま push すれば自動的に `.gs` に変換される
  - (build 等の別途の操作は不要)

```bash
clasp push
clasp status
```


## Reference

* GAS のGoogle謹製CLIツール clasp
  - https://qiita.com/HeRo/items/4e65dcc82783b2766c03
* clasp が Typescript をサポートした！
  - https://qiita.com/HeRo/items/f2ce057c6b1456e896ad
* Clasp TypeScript
  - https://github.com/google/clasp/blob/master/docs/typescript.md
* Googleカレンダーの予定をGASでスプレッドシートに取り込む
  - https://qiita.com/yekcam/items/cad26ea846f911db0ab8
* G Suite 組織内ユーザーの予定を名前から取得してみる
  - https://qiita.com/Shota_Fukuda/items/5c280cece174c58ac044
