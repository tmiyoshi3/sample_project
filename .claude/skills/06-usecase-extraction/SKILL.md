---
name: 06-usecase-extraction
description: "Phase 6 - 画面・機能・APIからユースケースを逆算して整理する"
disable-model-invocation: true
---

# 06-usecase-extraction: ユースケース抽出

## 目的

画面・機能・API・ソースコードからユースケースを逆算し、利用者の目的単位で再構成する。画面操作をそのままユースケースにせず、ユーザーが何を達成したいかの観点で整理する。

## 担当Phase

Phase 6: ユースケース抽出

---

## 入力ファイル

- CLAUDE.md
- spec/features.md
- spec/ui/F-XX-YY.html（対象中分類）
- spec/api/F-XX-YY.yml（対象中分類）
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）

## 出力ファイル

- spec/usecases/F-XX-YY.md（対象中分類）
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）

## 更新してよいファイル

- spec/usecases/F-XX-YY.md（自分の担当中分類のみ）
- spec/traceability/F-XX-YY.md（自分の担当中分類のみ）
- spec/worklog/F-XX-YY.md（自分の担当中分類のみ）
- spec/ui/F-XX-YY.html（自分の担当中分類のみ）（関連ユースケース欄の更新のみ）

## 更新してはいけないファイル

- CLAUDE.md
- 既存ソースコード
- spec/features.md（内容の変更は不可。関連ユースケースの追記のみ可）
- spec/api/F-XX-YY.yml
- spec/source-inventory.md
- spec/architecture.md
- tests/e2e/
- 他の担当者の中分類のファイル

---

## 実行手順

### Step 0: 事前確認

1. CLAUDE.md を読む。
2. spec/worklog/F-XX-YY.md を読み、前回の作業状況を確認する。
3. spec/traceability/F-XX-YY.md を読み、ステータスを確認する。
4. 対象機能IDとスコープを確認する。

### Step 1: 機能IDのグルーピング

spec/features.md を読み、関連する機能IDをグループ化する。

ユースケースは1つの機能IDに1:1対応するとは限らない:
- 複数の機能IDが1つのユースケースを構成する場合がある
- 1つの機能IDが複数のユースケースに関連する場合がある

### Step 2: ユーザー目的の抽出

各機能グループについて、利用者が何を達成したいのかを考える。

画面操作そのものをユースケースにしない:
- NG: 「ログインボタンをクリックする」
- OK: 「システムにログインして業務を開始する」
- NG: 「一覧画面で検索条件を入力する」
- OK: 「特定の条件で注文を検索し、状況を確認する」

### Step 3: ユースケースの記述

各ユースケースを以下の形式で記述する:

```markdown
## UC-001: <ユースケース名>

### アクター
- <利用者の種類/ロール>

### 目的
<利用者が達成したいこと>

### 事前条件
- <ユースケース開始時に成立している必要がある条件>

### 基本フロー
1. ...
2. ...
3. ...

### 代替フロー
- A1: <条件> → <処理>
- A2: <条件> → <処理>

### 例外フロー
- E1: <条件> → <処理>
- E2: <条件> → <処理>

### 事後条件
- <ユースケース完了後に成立している条件>

### 関連機能ID
- F-XX-YY-ZZZ, F-XX-YY-ZZZ, F-XX-YY-ZZZ

### 関連API
- GET /api/xxx
- POST /api/yyy

### 根拠
- 画面操作: ...
- ソースコード: ...
- 推測: ...

### confidence
High / Medium / Low

### 未確認事項
- ...
```

### Step 4: ユースケースIDの採番

- `UC-001`, `UC-002`, ... の連番
- 大分類（業務領域）でグルーピングする

### Step 5: 機能IDとユースケースIDの対応付け

spec/traceability/F-XX-YY.md の「ユースケース」列を更新する。
spec/ui/F-XX-YY.html の「関連ユースケース」欄を更新する。

### Step 6: spec/usecases/F-XX-YY.md の作成

```markdown
# ユースケース一覧

## 業務領域: <大分類>

### UC-001: <ユースケース名>
...

### UC-002: <ユースケース名>
...

## ユースケース × 機能ID マトリクス

| ユースケースID | ユースケース名 | 関連機能ID | アクター |
|---|---|---|---|
| UC-001 | ... | F-XX-YY-ZZZ, F-XX-YY-ZZZ | ... |
```

### Step 7: 終了処理

1. spec/traceability/F-XX-YY.md のステータスを `usecase-linked` に更新する。
2. spec/worklog/F-XX-YY.md を更新する（実施内容・更新ファイル・残作業・次skill）。
3. 成果サマリーを出力する。
4. 次skill（`07-architecture-design`）を報告する。

---

## 完了条件

- [ ] 機能IDとユースケースの対応が記録されている
- [ ] ユーザー目的単位でユースケースが整理されている
- [ ] 画面操作そのものをユースケースとして短絡していない
- [ ] 事前条件・基本フロー・代替フロー・例外フロー・事後条件が記載されている
- [ ] 根拠とconfidenceが記録されている
- [ ] 未確認事項が記録されている
- [ ] spec/usecases/F-XX-YY.md が作成されている
- [ ] spec/traceability/F-XX-YY.md でステータスが `usecase-linked` に更新されている
- [ ] spec/worklog/F-XX-YY.md が更新されている

---

## 制約

- 画面一覧をそのままユースケース一覧にしない。
- 利用者の目的を意識して再構成する。
- 他phaseの成果物変更・対象外機能IDの作業は行わない。
