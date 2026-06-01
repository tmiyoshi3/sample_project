@F-03-01-010 @UC-009
Feature: 製品カタログCSVエクスポート
  製品一覧画面からCSVファイルをダウンロードし、外部ツールで活用する

  Background:
    Given テスト用ユーザー "ADMIN" でログインしている
    And テストデータが初期化されている
    And 製品一覧画面が表示されている

  # --- 正常系 ---

  @正常系
  Scenario: CSV出力ボタンクリックでCSVファイルがダウンロードされる
    When CSV出力ボタンをクリックする
    Then "products_" で始まるCSVファイルがダウンロードされる

  @正常系
  Scenario: CSVファイル名にダウンロード日が含まれる
    When CSV出力ボタンをクリックする
    Then ダウンロードされたCSVファイル名が "products_YYYY-MM-DD.csv" 形式である

  @正常系
  Scenario: CSVヘッダに6項目が含まれる
    When CSV出力ボタンをクリックする
    Then ダウンロードされたCSVのヘッダ行に "SKU" が含まれている
    And ダウンロードされたCSVのヘッダ行に "製品名" が含まれている
    And ダウンロードされたCSVのヘッダ行に "カテゴリ" が含まれている
    And ダウンロードされたCSVのヘッダ行に "メーカー" が含まれている
    And ダウンロードされたCSVのヘッダ行に "単価" が含まれている
    And ダウンロードされたCSVのヘッダ行に "ステータス" が含まれている

  @正常系
  Scenario: CSVにデータ行が含まれる
    When CSV出力ボタンをクリックする
    Then ダウンロードされたCSVにデータ行が1件以上含まれている
    # 最大100件（MAX_PAGE_SIZE=100に制限される）

  # --- データ状態 ---

  @データ状態
  Scenario: フィルタ適用中でもCSVには全件出力される
    Given カテゴリフィルタで "ノートPC" を選択している
    When CSV出力ボタンをクリックする
    Then ダウンロードされたCSVにフィルタ適用前と同じ件数のデータ行が含まれている

  # --- 権限 ---

  @権限
  Scenario Outline: 全ロールのユーザーがCSV出力できる
    Given テスト用ユーザー "<ロール>" でログインしている
    And 製品一覧画面が表示されている
    When CSV出力ボタンをクリックする
    Then CSVファイルがダウンロードされる

    Examples:
      | ロール           |
      | ADMIN            |
      | MANAGER          |
      | BUYER            |
      | WAREHOUSE_STAFF  |
      | VIEWER           |
