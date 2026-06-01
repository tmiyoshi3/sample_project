// Generated from: features/F-03/F-03-03-001_category-tree.feature
import { test } from "playwright-bdd";

test.describe('カテゴリツリー表示と製品数', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('カテゴリツリーが全ノード展開状態で表示される', { tag: ['@F-03-03-001', '@F-03-03-008', '@UC-012', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('カテゴリ管理画面を表示する', null, { page }); 
    await Then('カテゴリツリーが表示されている', null, { page }); 
    await And('ルートカテゴリが6件表示されている', null, { page }); 
    await And('全ノードが展開状態である', null, { page }); 
  });

  test('親子関係が正しく階層表示される', { tag: ['@F-03-03-001', '@F-03-03-008', '@UC-012', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('カテゴリ管理画面を表示する', null, { page }); 
    await Then('「コンピュータ」の子カテゴリとして「デスクトップPC」「ノートPC」「ワークステーション」が表示されている', null, { page }); 
  });

  test('製品ありカテゴリの製品数が表示される', { tag: ['@F-03-03-001', '@F-03-03-008', '@UC-012', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('カテゴリ管理画面を表示する', null, { page }); 
    await Then('「コンピュータ」の製品数が「2」と表示されている', null, { page }); 
  });

  test('製品なしカテゴリの製品数が0と表示される', { tag: ['@F-03-03-001', '@F-03-03-008', '@UC-012', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('カテゴリ管理画面を表示する', null, { page }); 
    await Then('「ネットワーク」の製品数が「0」と表示されている', null, { page }); 
  });

  test('子カテゴリを持たないカテゴリには展開アイコンが表示されない', { tag: ['@F-03-03-001', '@F-03-03-008', '@UC-012', '@データ状態'] }, async ({ When, Then, page }) => { 
    await When('カテゴリ管理画面を表示する', null, { page }); 
    await Then('「サプライ品」に展開/折りたたみアイコンが表示されていない', null, { page }); 
  });

  test('子カテゴリを持つカテゴリには展開アイコンが表示される', { tag: ['@F-03-03-001', '@F-03-03-008', '@UC-012', '@データ状態'] }, async ({ When, Then, page }) => { 
    await When('カテゴリ管理画面を表示する', null, { page }); 
    await Then('「コンピュータ」に展開アイコンが表示されている', null, { page }); 
  });

  test.describe('全ロールでカテゴリツリーが閲覧できる', () => {

    test('Example #1', { tag: ['@F-03-03-001', '@F-03-03-008', '@UC-012', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await When('カテゴリ管理画面を表示する', null, { page }); 
      await Then('カテゴリツリーが表示されている', null, { page }); 
      await And('ルートカテゴリが6件表示されている', null, { page }); 
    });

    test('Example #2', { tag: ['@F-03-03-001', '@F-03-03-008', '@UC-012', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await When('カテゴリ管理画面を表示する', null, { page }); 
      await Then('カテゴリツリーが表示されている', null, { page }); 
      await And('ルートカテゴリが6件表示されている', null, { page }); 
    });

    test('Example #3', { tag: ['@F-03-03-001', '@F-03-03-008', '@UC-012', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await When('カテゴリ管理画面を表示する', null, { page }); 
      await Then('カテゴリツリーが表示されている', null, { page }); 
      await And('ルートカテゴリが6件表示されている', null, { page }); 
    });

    test('Example #4', { tag: ['@F-03-03-001', '@F-03-03-008', '@UC-012', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await When('カテゴリ管理画面を表示する', null, { page }); 
      await Then('カテゴリツリーが表示されている', null, { page }); 
      await And('ルートカテゴリが6件表示されている', null, { page }); 
    });

    test('Example #5', { tag: ['@F-03-03-001', '@F-03-03-008', '@UC-012', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await When('カテゴリ管理画面を表示する', null, { page }); 
      await Then('カテゴリツリーが表示されている', null, { page }); 
      await And('ルートカテゴリが6件表示されている', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-03-001_category-tree.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":14,"tags":["@F-03-03-001","@F-03-03-008","@UC-012","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then カテゴリツリーが表示されている","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And ルートカテゴリが6件表示されている","stepMatchArguments":[{"group":{"start":8,"value":"6","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And 全ノードが展開状態である","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":21,"tags":["@F-03-03-001","@F-03-03-008","@UC-012","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then 「コンピュータ」の子カテゴリとして「デスクトップPC」「ノートPC」「ワークステーション」が表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}},{"group":{"start":18,"value":"デスクトップPC","children":[]}},{"group":{"start":28,"value":"ノートPC","children":[]}},{"group":{"start":35,"value":"ワークステーション","children":[]}}]}]},
  {"pwTestLine":23,"pickleLine":26,"tags":["@F-03-03-001","@F-03-03-008","@UC-012","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"When カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then 「コンピュータ」の製品数が「2」と表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}},{"group":{"start":14,"value":"2","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":28,"pickleLine":31,"tags":["@F-03-03-001","@F-03-03-008","@UC-012","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"Then 「ネットワーク」の製品数が「0」と表示されている","stepMatchArguments":[{"group":{"start":1,"value":"ネットワーク","children":[]}},{"group":{"start":14,"value":"0","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":33,"pickleLine":38,"tags":["@F-03-03-001","@F-03-03-008","@UC-012","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then 「サプライ品」に展開/折りたたみアイコンが表示されていない","stepMatchArguments":[{"group":{"start":1,"value":"サプライ品","children":[]}}]}]},
  {"pwTestLine":38,"pickleLine":43,"tags":["@F-03-03-001","@F-03-03-008","@UC-012","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"When カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then 「コンピュータ」に展開アイコンが表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]}]},
  {"pwTestLine":45,"pickleLine":58,"tags":["@F-03-03-001","@F-03-03-008","@UC-012","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":47,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then カテゴリツリーが表示されている","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And ルートカテゴリが6件表示されている","stepMatchArguments":[{"group":{"start":8,"value":"6","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":52,"pickleLine":59,"tags":["@F-03-03-001","@F-03-03-008","@UC-012","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then カテゴリツリーが表示されている","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And ルートカテゴリが6件表示されている","stepMatchArguments":[{"group":{"start":8,"value":"6","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":59,"pickleLine":60,"tags":["@F-03-03-001","@F-03-03-008","@UC-012","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":61,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then カテゴリツリーが表示されている","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And ルートカテゴリが6件表示されている","stepMatchArguments":[{"group":{"start":8,"value":"6","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":66,"pickleLine":61,"tags":["@F-03-03-001","@F-03-03-008","@UC-012","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":68,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then カテゴリツリーが表示されている","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And ルートカテゴリが6件表示されている","stepMatchArguments":[{"group":{"start":8,"value":"6","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":73,"pickleLine":62,"tags":["@F-03-03-001","@F-03-03-008","@UC-012","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":75,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then カテゴリツリーが表示されている","stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And ルートカテゴリが6件表示されている","stepMatchArguments":[{"group":{"start":8,"value":"6","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end