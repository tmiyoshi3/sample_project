---
name: 03-source-structure-discovery
description: "Phase 2 - ソースコードの構造を解析し画面から見えない処理を発見する"
disable-model-invocation: true
---

# 03-source-structure-discovery: ソース構造解析

## 目的

既存ソースコードを読み、画面探索で発見した機能に対応するソースコード上の構造を一覧化する。画面から見えない処理（バッチ、認証、認可、バリデーション、外部連携など）も発見する。

## 担当Phase

Phase 2: ソース構造解析

---

## 入力ファイル

- CLAUDE.md
- spec/features.md
- spec/traceability/index.md
- spec/traceability/F-XX.md（対象大分類）
- spec/worklog/F-XX.md（対象大分類）
- 対象ソースコード（CLAUDE.md に記載のソースパス）

## 出力ファイル

- spec/source-inventory.md
- spec/features.md（新規機能IDの追加のみ）
- spec/traceability/F-XX.md（対象大分類）
- spec/worklog/F-XX.md（対象大分類）

## 参照すべきファイル

- CLAUDE.md
- spec/features.md
- spec/traceability/index.md
- spec/traceability/F-XX.md（対象大分類）
- spec/worklog/F-XX.md（対象大分類）

## 更新してよいファイル

- spec/source-inventory.md
- spec/features.md（新規機能IDの追加のみ）
- spec/traceability/F-XX.md（自分の担当大分類のみ）
- spec/worklog/F-XX.md（自分の担当大分類のみ）

## 更新してはいけないファイル

- CLAUDE.md
- 既存ソースコード（読み取り専用）
- spec/ui/F-XX.html
- spec/api/F-XX.yml
- spec/usecases/F-XX.md
- spec/architecture.md
- tests/e2e/
- 他の担当者の大分類のファイル

## 実行手順

### Step 0: 事前確認

1. CLAUDE.md を読む。
2. spec/worklog/F-XX.md を読み、前回の作業状況を確認する。
3. spec/traceability/F-XX.md を読み、ステータスを確認する。
4. 対象範囲とスコープを確認する。

### Step 1: ディレクトリ構造の把握

対象ソースコードのトップレベル構造を確認する:
- フロントエンド / バックエンドの分離
- 主要ディレクトリの役割
- 設定ファイルの場所
- ビルド設定

### Step 2: ルーティングの確認

フロントエンド:
- ルーティング定義ファイルを特定する
- 画面一覧との対応を確認する
- 画面探索で見つけていなかったルートがあれば記録する

バックエンド:
- APIルーティング定義を特定する
- エンドポイント一覧を整理する

### Step 3: 画面コンポーネントの確認

- 画面に対応するコンポーネントファイルを特定する
- spec/features.md の機能IDとの対応を記録する
- 共通コンポーネントを特定する

### Step 4: APIエンドポイントの確認

- Controller / Handler を特定する
- 各エンドポイントのmethod、path、対応する処理を記録する
- 認証・認可の適用状況を記録する

### Step 5: Service / Repository / DAO の確認

- ビジネスロジック層を特定する
- データアクセス層を特定する
- Entity / Model を特定する

### Step 6: 画面から見えない処理の発見

以下を探す:
- バッチ処理 / ジョブ
- スケジュール実行
- 非同期処理
- イベントハンドラ
- WebSocket
- 外部API連携
- メール送信
- ファイル処理

### Step 7: 認証・認可の確認

- 認証方式（Session / JWT / OAuth など）
- 認可の実装方法（ロールベース / 権限ベースなど）
- ミドルウェア / フィルタ / ガード

### Step 8: バリデーションの確認

- フロントエンドバリデーション
- バックエンドバリデーション
- DB制約

### Step 9: エラーハンドリングの確認

- グローバルエラーハンドラ
- API エラーレスポンス形式
- 画面のエラー表示方式

### Step 10: spec/source-inventory.md の作成

以下のカテゴリで整理する:

```markdown
# ソース構造インベントリ

## ルーティング
| パス | コンポーネント/ハンドラ | 機能ID | 備考 |

## 画面コンポーネント
| ファイルパス | コンポーネント名 | 画面 | 機能ID | 備考 |

## APIエンドポイント
| method | path | Controller | 機能ID | 認証 | 認可 | 備考 |

## Service
| ファイルパス | クラス/関数名 | 責務 | 機能ID | 備考 |

## Repository / DAO
| ファイルパス | クラス/関数名 | 対象テーブル | 機能ID | 備考 |

## Entity / Model
| ファイルパス | クラス名 | 対応テーブル | 備考 |

## 認証・認可
| 方式 | 実装箇所 | 適用範囲 | 備考 |

## バリデーション
| 対象 | 実装箇所 | ルール | 機能ID | 備考 |

## バッチ / ジョブ
| 名称 | ファイルパス | スケジュール | 処理内容 | 備考 |

## 外部連携
| 連携先 | ファイルパス | 方式 | 備考 |

## エラーハンドリング
| 種別 | 実装箇所 | 方式 | 備考 |
```

### Step 11: 画面探索との差分確認

- ソースコードにあるが画面探索で見つけていなかったものを記録する
- 新規機能IDを採番し、spec/features.md に追加する（ステータス: `discovered`）
- ソースはあるが画面からは到達できないものを「画面未到達」として記録する

### Step 12: 終了処理

1. spec/traceability/F-XX.md を更新する。
2. spec/worklog/F-XX.md を更新する（実施内容・更新ファイル・残作業・次skill）。
3. 成果サマリーを出力する（新規発見した機能ID数・差分）。
4. 次skill（`04-ui-specification`）を報告する。

---

## 完了条件

- [ ] ルーティング、画面コンポーネント、API、Controller、Service、Repository、Entityが一覧化されている
- [ ] 認証・認可の方式が記録されている
- [ ] バリデーションの実装箇所が記録されている
- [ ] バッチ・ジョブ・外部連携が確認されている
- [ ] 画面探索で見つけた機能とソースコードの対応が整理されている
- [ ] 画面から見えない処理が記録されている
- [ ] 新規発見した機能に機能IDが採番されている
- [ ] spec/source-inventory.md が作成されている
- [ ] spec/traceability/F-XX.md が更新されている
- [ ] spec/worklog/F-XX.md が更新されている

---

## 制約

- 既存ソースコードは読み取り専用とし、変更しない。
- 実装の改善案を勝手に反映しない。
- 他phaseの成果物変更・対象外の作業は行わない。
