# AGENTS.md

信号よみ：信号の意味（歩行者・車・自転車・路面電車が何をしてよいか）を読んで、どの信号（施行令第2条第1項の表の10種類）かを当てる1日5問の学習ゲーム。正解したら「この信号で、歩行者は？」（進める・渡り始めない・渡ってはいけない・注意して進める・歩行者への決まりは無い）も選ぶ。`index.html` と `data.js`（問題の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（30種類×3000問：選び肢・答えは1つ・答えと2段目が別に書いた表どおり・まぎらわしい信号の入れ方・出典）・今日の5問と上級（3年分）・とことん・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身は e-Gov「道路交通法施行令」第2条（信号の意味）に書いてあることだけ（2026-09-01 施行の版を 2026-11-17 に読んだ。要点は共有フォルダ games/shingo-research.md）。種類を足すときも条文を読み、`qa/run.mjs` の `TB`（別に書いた表）にも足す。施行令が改正されたら読み直す。
- 扱うのは信号の表示ごとの意味だけ。標識（標識よみ hyoshiki-yomi）・自転車の通行のルール（自転車ルールみきわめ jitensha-rule）と重ねない。第2条第2項以降（左折可の表示・特定の交通だけの信号・歩行者自転車専用の表示）は問題にしない。
- 1つの意味の文に2つの信号が当てはまるときは、その信号をまちがいの選び肢にしない（`same`）。歩行者用か車用かで分かれるときは、文に「歩行者用の信号で」「人の形でない信号で」と書く。
- 運転の教習・法律の助言にしない：遊び方・「このゲームについて」・README に、実際の道では信号・標識・警察官の指示に従うこと、公式の情報の代わりではないこと、決まりは e-Gov で確かめることを置く（QA が見る）。
- 問題は、やさしいが選び肢3つ（まぎらわしい信号を入れない）、ふつうが4つ、むずかしいが4つ（まぎらわしい信号 `CONF` を1つ必ず入れる）。2回目のヒントはまちがいを消して2つにしぼり、要点（`key`）も見せる。2段目は「この信号で、歩行者は？」（5つ）で、答えの信号で決まる（`GRP_OF`）。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・言い回しの並びは最後に足すだけ（QA の `PIN` が第1回の1問目を見る）。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「この信号で、歩行者は？」・復習（1→3→7日後）。記録 `sgn-v1`・文字 `sgn-fs`・復習 `sgn-depth`。
- 保存の読み直しは共通部品 `GameStore`（`<!-- store:begin -->`〜`end`。shared-workflows `template/store/store.js` の写しで、ここでは直さない）。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答えを出さない。感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台はこまったら何番？（nanban-soudan）から写した。写し元の言葉が残っていないかを QA が見る。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
