---
repo: azu/delete-tweets
url: 'https://github.com/azu/delete-tweets'
homepage: ''
starredAt: '2021-11-21T22:40:19Z'
createdAt: '2021-06-16T13:39:43Z'
updatedAt: '2025-02-13T02:40:44Z'
language: TypeScript
license: MIT
branch: main
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:36.508Z'
description: Twitterのアーカイブから削除候補のTweetsを抽出する補助ツールと削除するツール。
tags:
  - delete
  - japaneses
  - twitter
---

# delete-tweets

Twitterのアーカイブから削除候補のTweetsを抽出する補助ツールと削除するツール。

- :warning: 削除候補の抽出は基本的に過剰にかかるようになっています。細かいところは辞書などで調整してください。
- :warning: Tweetsの削除をすると復元はできないので、自己責任で削除してください。

## Features

- Twitterの[データアーカイブ](https://help.twitter.com/ja/managing-your-account/how-to-download-your-twitter-archive)を使った削除の対応
- 自然言語、感情極性値ベースのフィルターでの絞り込みの対応
  - 許可リスト、不許可リスト、ネガティブポジティブ(感情極性値ベース)のフィルタリング、[放送禁止用語](https://github.com/hata6502/textlint-rule-no-hoso-kinshi-yogo)、[不適切表現](https://github.com/textlint-ja/textlint-rule-ja-no-inappropriate-words)
- 絞り込んだ結果のみをTwitterから削除
- 削除済みの履歴を使った絞り込みのキャッシュ
  - Tweetsを削除して、辞書を更新して、また絞り込みと何度も繰り返し処理ができる

## 必要なもの

- Node.js 14+
- [全ツイート履歴をダウンロードしたzipファイル](https://help.twitter.com/ja/managing-your-account/how-to-download-your-twitter-archive)
- [Twitter V2 APIのクライアント](https://developer.twitter.com)のAPIキー

## Install

[Yarn](https://classic.yarnpkg.com/en/)を使ってインストールして、`yarn bootstrap`を実行してください。

```
yarn install
yarn bootstrap
```

## Usage

次のステップでTweetsを削除します。

1. Import Archive - TwitterのアーカイブからTweetsデータの作成
2. Detect Tweets - Tweetsデータをフィルタリングして削除候補のTweetsデータを作成
3. Delete Tweets - 削除対象のTweetsを削除

削除後は、`data/deleted-twwets.txt` に削除したTweetのIDが記録されます。
すでに削除済みの場合は、次から無視されるので、2 ~ 3 を繰り返し実行できるようにデザインしています。

### Import Archive

1. [全ツイート履歴をダウンロードする方法](https://help.twitter.com/ja/managing-your-account/how-to-download-your-twitter-archive)を参考にTwitterのアーカイブをリクエストします
2. Twitterのアーカイブ(`twitter-*.zip`)をダウンロードして展開します
3. 中に含まれる `tweeet*.js` を `twitter-archives/` ディレクトリにコピーします

```
twitter-archives/
├── tweet.js
├── tweet-part1.js
└── tweet-part2.js
```

4. 次のコマンドを実行して、`tweet*.js` をインポートして `data/tweets.json` を作成します

```
yarn import-twitter-archives
```

### Detect Tweets

`yarn detect` コマンドで、削除候補のTweetsデータを `data/will-delete-tweets.json` として作成できます。

    # 全ての期間を対象にする
    $ yarn detect
    # 2015-01-01 ~ Now
    $ yarn detect --fromDate 2015-01-01
    # 2015-01-01 ~ 2016-01-01
    $ yarn detect --fromDate 2015-01-01 --toDate 2016-01-01

`yarn detect`は `--fromDate YYYY-MM-DD` と `--toDate YYYY-MM-DD` で対象のTweetsの日付範囲を指定できます。

削除候補を推定する実装アルゴリズムは次の通りです。

- [x] textlintでの[放送禁止用語](https://github.com/hata6502/textlint-rule-no-hoso-kinshi-yogo)、[不適切表現](https://github.com/textlint-ja/textlint-rule-ja-no-inappropriate-words)のチェック
- [x] ネガティブ(感情極性値ベース)の推定
- [x] ユーザー定義の許可リスト、不許可リスト

[config.js](./config.js)でそれぞれの仕組みを利用するかの設定ができます。

:memo: 基本的にfalse positiveを含んだ過剰な削除候補を作成します。削除候補をチェックして実際に削除する候補のみを `data/will-delete-tweets.json` に残してください。

ユーザー定義の辞書で削除候補に追加、削除できます。
次のファイルに定義することで、自動的に`yarn detect`が処理します。

#### `allow-id.yaml`

削除しないTweetの`id`を指定できます。

たとえば、`https://twitter.com/twitter/status/123456765432` を削除対象から外す場合は次のように定義できます。

```yaml
- 123456765432
```

#### `disallow.yaml`

Tweetsに含まれていたら削除対象とする辞書を定義します。
不許可リストには、文字列または[RegExp-like String](https://github.com/textlint/regexp-string-matcher#regexp-like-string)ベースの正規表現の配列を指定できます。

マッチ対象は `tweeet.text` の値のみです。

```yaml
- /[亜-熙ぁ-んァ-ヶ]w+(\s|$)/ # これはwww みたいなやつ
- /(?<!く)ださい/ # くださいは対象外
- /これだけ知って(おけ|れば)/
- 嘘つき
- ぼったくり
```

#### `allow.yaml`

`disallow.yaml`やtextlintでNGとなった場合にも、マッチした範囲が`allow.yaml`で許可されている場合は、削除対象から外せます。
許可リストには、文字列または[RegExp-like String](https://github.com/textlint/regexp-string-matcher#regexp-like-string)ベースの正規表現の配列を指定できます。

:memo: `allow.yaml`で定義した辞書が`tweet.text` に含まれているから無条件にOKではなく、あくまでNGとなった範囲が許可された範囲に含まれていれば、OKという実装になってる

```yaml
- エディター # 特定の単語はOK
- /ECMAScript \d+/ # 正規表現
- /.*example\.com.*/ # example.com を含むならOK
```

例) 次のように`disallow.yaml`で `クソ` という単語をNGとしてしまうと、`ダークソウル`もNGとなってしまう。
この場合は、`allow.yaml` に `ダークソウル` を定義することで、`ダークソウル`は許可される。

`disallow.yaml`:

```yaml
- クソ
```

`allow.yaml`:

```yaml
- ダークソウル
```

実装の詳細:

`disallow.yaml`によって、2から3までの範囲がNGとして報告される。
`allow.yaml`によって、0から5までの範囲はたとえNGがあっても例外として無視する。

```shell
|０|１|２|３|４|５|６|７|８|９|
------------------ 対象のTweetのtext
|ダ|ー|ク|ソ|ウ|ル|は|ゲ|ー|ム|
------------------ disallow.yamlの定義
 　 　|ク|ソ|
------------------ allow.yamlの定義
|ダ|ー|ク|ソ|ウ|ル|
```

Steps:

1. `allow-id.yaml` check `tewet.id`
2. `disallow.yaml` check `tweet.text`
3. `allow.yaml` check the disallowed word

### Delete tweets

`yarn detect`で作成した `data/will-delete-tweets.json` にかかれているTweetsを実際に削除します。

`.env` ファイルを作成し、[Twitter V2 APIのクライアント](https://developer.twitter.com)を作成して、そのクライアントのAPI KeyとAccess Tokenを入れて下さい。

```
TWITTER_APP_KEY="x"
TWITTER_APP_SECRET="x"
TWITTER_ACCESS_TOKEN="x"
TWITTER_ACCESS_SECRET="x"
```

`yarn delete-tweets` を実行すると、 `data/will-delete-tweets.json` に書かれたTweetsを0.5秒間隔で削除していきます。

    yarn delete-tweets # It delete tweets actually

:warning: Tweetsを削除すると復元はできません。 `data/will-delete-tweets.json` には削除したい対象だけを残してください。
TwitterのAPIを大量に叩く可能性があるので、自己責任で実行してください。

:memo: 削除したTweetsは`data/deleted-twwets.txt`にIDが記録されます。
途中で削除を停止した場合も続きから実行できます。Rate Limitにかかった場合は自動で停止するつもりですが、そうじゃなかったらIssueを作ってください。

## Debug

[jq](https://stedolan.github.io/jq/) support JSONLD.

```shell
cat data/will-delete-tweets.json | jq -s ".[].text"
```

Count will delete tweets:

```
cat data/will-delete-tweets.json | wc -l
```

Group by error's `reason`:

```shell
cat data/will-delete-tweets.json | jq -s "group_by(.reason)[] |  {(.[0].reason): [.[] | .]}"
```

Group by error's `reason` and count it 

```shell
cat data/will-delete-tweets.json | jq -s "[group_by(.reason)[] | {reason: .[0].reason, count: length }] | sort_by(.count) | reverse"
```

Show specific reason

```shell
cat data/will-delete-tweets.json | jq -s 'group_by(.reason)[] | select(.[0].reason | contains("理由")) | .[].text'
```

Show favorited sort

```shell
cat data/will-delete-tweets.json | jq -s "[group_by(.reason)[] | {favorite_count: .[0].favorite_count, tweet: .[0].text, count: length, reason: .[0].reason  }] | sort_by(.favorite_count) | reverse" | less
```

Remove specific errors

```shell
cat data/will-delete-tweets.json | jq -s -c 'group_by(.reason)[] | select(.[0].reason | contains("感情極性値") | not) | .[]' > data/will-delete-tweets.updated.json 
```

Test a text from stdin

```shell
echo "いやらしい文章" | yarn test-detect
# 感情極性値が0.3未満
# [ 'textlint-rule-ja-no-inappropriate-words: 不適切表現「いやらしい」が含まれています。' ]
```

## Related

- [azu/mytweets: Search your all tweets.](https://github.com/azu/mytweets)

## Changelog

See [Releases page](https://github.com/azu/delete-tweets/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/delete-tweets/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- azu: [GitHub](https://github.com/azu), [Twitter](https://twitter.com/azu_re)

## License

MIT © azu
