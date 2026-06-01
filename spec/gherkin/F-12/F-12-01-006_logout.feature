# language: ja

@F-12-01-006 @UC-003
Feature: システムからログアウトする
  ユーザーメニューからログアウトし、セッションを安全に終了する

  Background:
    Given テストデータが初期化されている

  # --- 正常系 ---

  @正常系
  Scenario: ユーザーメニューからログアウトする
    Given テスト用ユーザー "ADMIN" でログインしている
    When ユーザーメニューを開く
    And ログアウトボタンをクリックする
    Then ログイン画面が表示される

  @正常系
  Scenario: ログアウト後にシステムにアクセスするとログイン画面にリダイレクトされる
    Given テスト用ユーザー "ADMIN" でログインしている
    And ユーザーメニューからログアウトしている
    When ダッシュボード画面にアクセスする
    Then ログイン画面にリダイレクトされる

  # --- 権限 ---

  @権限
  Scenario Outline: 全ロールのユーザーがログアウトできる
    Given テスト用ユーザー "<ロール>" でログインしている
    When ユーザーメニューを開く
    And ログアウトボタンをクリックする
    Then ログイン画面が表示される

    Examples:
      | ロール          |
      | ADMIN           |
      | MANAGER         |
      | BUYER           |
      | WAREHOUSE_STAFF |
      | VIEWER          |
