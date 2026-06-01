# language: ja

@F-03-02-002 @F-03-02-003 @UC-010
Feature: 製品詳細画面のナビゲーションボタン
  製品詳細画面から製品一覧画面への戻りと製品編集画面への遷移を提供する

  Background:
    Given テスト用ユーザー "ADMIN" でログインしている
    And テストデータが初期化されている
    And 製品ID "1" の製品詳細画面を表示している

  # --- 正常系 ---

  @正常系
  Scenario: 「一覧に戻る」ボタンクリックで製品一覧画面に遷移する
    When 「一覧に戻る」ボタンをクリックする
    Then 製品一覧画面が表示されている

  @正常系
  Scenario: 「編集」ボタンクリックで製品編集画面に遷移する
    When 「編集」ボタンをクリックする
    Then 製品編集画面が表示されている

  # --- 権限 ---

  @権限
  Scenario Outline: 全ロールのユーザーが一覧に戻るボタンを操作できる
    Given テスト用ユーザー "<ロール>" でログインしている
    And 製品ID "1" の製品詳細画面を表示している
    When 「一覧に戻る」ボタンをクリックする
    Then 製品一覧画面が表示されている

    Examples:
      | ロール           |
      | ADMIN            |
      | MANAGER          |
      | BUYER            |
      | WAREHOUSE_STAFF  |
      | VIEWER           |

  @権限
  Scenario Outline: 全ロールのユーザーが編集ボタンを操作できる
    Given テスト用ユーザー "<ロール>" でログインしている
    And 製品ID "1" の製品詳細画面を表示している
    When 「編集」ボタンをクリックする
    Then 製品編集画面が表示されている

    Examples:
      | ロール           |
      | ADMIN            |
      | MANAGER          |
      | BUYER            |
      | WAREHOUSE_STAFF  |
      | VIEWER           |
