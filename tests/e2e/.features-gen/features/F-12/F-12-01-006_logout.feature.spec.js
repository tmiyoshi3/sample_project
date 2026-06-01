// Generated from: features/F-12/F-12-01-006_logout.feature
import { test } from "playwright-bdd";

test.describe('システムからログアウトする', () => {

  test.beforeEach('Background', async ({ Given }, testInfo) => { if (testInfo.error) return;
    await Given('テストデータが初期化されている'); 
  });
  
  test('ユーザーメニューからログアウトする', { tag: ['@F-12-01-006', '@UC-003', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await When('ユーザーメニューを開く', null, { page }); 
    await And('ログアウトボタンをクリックする', null, { page }); 
    await Then('ログイン画面が表示される', null, { page }); 
  });

  test('ログアウト後にシステムにアクセスするとログイン画面にリダイレクトされる', { tag: ['@F-12-01-006', '@UC-003', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('ユーザーメニューからログアウトしている', null, { page }); 
    await When('ダッシュボード画面にアクセスする', null, { page }); 
    await Then('ログイン画面にリダイレクトされる', null, { page }); 
  });

  test.describe('全ロールのユーザーがログアウトできる', () => {

    test('Example #1', { tag: ['@F-12-01-006', '@UC-003', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await When('ユーザーメニューを開く', null, { page }); 
      await And('ログアウトボタンをクリックする', null, { page }); 
      await Then('ログイン画面が表示される', null, { page }); 
    });

    test('Example #2', { tag: ['@F-12-01-006', '@UC-003', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await When('ユーザーメニューを開く', null, { page }); 
      await And('ログアウトボタンをクリックする', null, { page }); 
      await Then('ログイン画面が表示される', null, { page }); 
    });

    test('Example #3', { tag: ['@F-12-01-006', '@UC-003', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await When('ユーザーメニューを開く', null, { page }); 
      await And('ログアウトボタンをクリックする', null, { page }); 
      await Then('ログイン画面が表示される', null, { page }); 
    });

    test('Example #4', { tag: ['@F-12-01-006', '@UC-003', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await When('ユーザーメニューを開く', null, { page }); 
      await And('ログアウトボタンをクリックする', null, { page }); 
      await Then('ログイン画面が表示される', null, { page }); 
    });

    test('Example #5', { tag: ['@F-12-01-006', '@UC-003', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await When('ユーザーメニューを開く', null, { page }); 
      await And('ログアウトボタンをクリックする', null, { page }); 
      await Then('ログイン画面が表示される', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-12/F-12-01-006_logout.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":12,"tags":["@F-12-01-006","@UC-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When ユーザーメニューを開く","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"And ログアウトボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then ログイン画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":19,"tags":["@F-12-01-006","@UC-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"And ユーザーメニューからログアウトしている","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When ダッシュボード画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then ログイン画面にリダイレクトされる","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":36,"tags":["@F-12-01-006","@UC-003","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When ユーザーメニューを開く","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"And ログアウトボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then ログイン画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":33,"pickleLine":37,"tags":["@F-12-01-006","@UC-003","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When ユーザーメニューを開く","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"And ログアウトボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then ログイン画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":40,"pickleLine":38,"tags":["@F-12-01-006","@UC-003","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":42,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When ユーザーメニューを開く","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"And ログアウトボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then ログイン画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":47,"pickleLine":39,"tags":["@F-12-01-006","@UC-003","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":49,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When ユーザーメニューを開く","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"And ログアウトボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then ログイン画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":54,"pickleLine":40,"tags":["@F-12-01-006","@UC-003","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":56,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When ユーザーメニューを開く","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"And ログアウトボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then ログイン画面が表示される","stepMatchArguments":[]}]},
]; // bdd-data-end