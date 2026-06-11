// Generated from: features/F-04/F-04-02-001_header-basic-info.feature
import { test } from "playwright-bdd";

test.describe('サプライヤー詳細画面 - ヘッダ情報・基本情報タブ・連絡先セクション', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('ACTIVEサプライヤーのヘッダ情報が表示される', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await Then('SD_ページタイトル「サプライヤー詳細」が表示されている', null, { page }); 
    await And('SD_会社名「大塚商会」が表示されている', null, { page }); 
    await And('SD_ステータスバッジ「有効」が表示されている', null, { page }); 
    await And('SD_コード「SUP-001」が表示されている', null, { page }); 
    await And('SD_評価「0.0」が表示されている', null, { page }); 
  });

  test('SUSPENDEDサプライヤーのステータスバッジが表示される', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@正常系'] }, async ({ Given, Then, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=12）にアクセスしている', null, { page }); 
    await Then('SD_ステータスバッジ「停止中」が表示されている', null, { page }); 
  });

  test('基本情報タブがデフォルトで表示される', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await Then('SD_基本情報タブが選択されている', null, { page }); 
    await And('SD_会社情報セクションが表示されている', null, { page }); 
  });

  test('会社情報テーブルにサプライヤー属性が表示される', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await Then('SD_会社情報「会社名」に「大塚商会」が表示されている', null, { page }); 
    await And('SD_会社情報「コード」に「SUP-001」が表示されている', null, { page }); 
  });

  test('DTOに含まれないフィールドは「-」で表示される', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await Then('SD_会社情報「会社名（カナ）」に「-」が表示されている', null, { page }); 
    await And('SD_会社情報「住所」に「-」が表示されている', null, { page }); 
    await And('SD_会社情報「ウェブサイト」に「-」が表示されている', null, { page }); 
    await And('SD_会社情報「支払条件」に「-」が表示されている', null, { page }); 
    await And('SD_会社情報「備考」に「-」が表示されている', null, { page }); 
  });

  test('連絡先カードが表示される', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await Then('SD_連絡先セクションが表示されている', null, { page }); 
    await And('SD_連絡先カードが 2 件表示されている', null, { page }); 
  });

  test('主担当連絡先に主担当バッジが表示される', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await Then('SD_連絡先「松本 健太」に主担当バッジが表示されている', null, { page }); 
    await And('SD_連絡先「松本 健太」の部署が「法人営業部」である', null, { page }); 
    await And('SD_連絡先「松本 健太」に電話番号が表示されている', null, { page }); 
    await And('SD_連絡先「松本 健太」にメールアドレスが表示されている', null, { page }); 
  });

  test('副担当連絡先には主担当バッジが表示されない', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@正常系'] }, async ({ Given, Then, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await Then('SD_連絡先「岡田 由美」に主担当バッジが表示されていない', null, { page }); 
  });

  test('5つのタブが切替可能である', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await When('SD_「製品」タブをクリックする', null, { page }); 
    await Then('SD_タブコンテンツが表示されている', null, { page }); 
    await When('SD_「契約」タブをクリックする', null, { page }); 
    await Then('SD_タブコンテンツが表示されている', null, { page }); 
    await When('SD_「評価履歴」タブをクリックする', null, { page }); 
    await Then('SD_タブコンテンツが表示されている', null, { page }); 
    await When('SD_「認証」タブをクリックする', null, { page }); 
    await Then('SD_タブコンテンツが表示されている', null, { page }); 
    await When('SD_「基本情報」タブをクリックする', null, { page }); 
    await Then('SD_タブコンテンツが表示されている', null, { page }); 
  });

  test('連絡先が0件の場合、空状態メッセージが表示される', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@データ状態'] }, async ({ Given, Then, And, page }) => { 
    await Given('SD_テスト用サプライヤー（連絡先なし）が作成されている'); 
    await And('SD_テスト用サプライヤー詳細画面にアクセスしている', null, { page }); 
    await Then('SD_連絡先空状態メッセージが表示されている', null, { page }); 
  });

  test.describe('全ロールでサプライヤー詳細が表示される', () => {

    test('Example #1', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@権限'] }, async ({ Given, When, Then, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await When('SD_サプライヤー詳細画面（ID=1）にアクセスする', null, { page }); 
      await Then('SD_会社名「大塚商会」が表示されている', null, { page }); 
    });

    test('Example #2', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@権限'] }, async ({ Given, When, Then, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await When('SD_サプライヤー詳細画面（ID=1）にアクセスする', null, { page }); 
      await Then('SD_会社名「大塚商会」が表示されている', null, { page }); 
    });

    test('Example #3', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@権限'] }, async ({ Given, When, Then, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await When('SD_サプライヤー詳細画面（ID=1）にアクセスする', null, { page }); 
      await Then('SD_会社名「大塚商会」が表示されている', null, { page }); 
    });

    test('Example #4', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@権限'] }, async ({ Given, When, Then, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await When('SD_サプライヤー詳細画面（ID=1）にアクセスする', null, { page }); 
      await Then('SD_会社名「大塚商会」が表示されている', null, { page }); 
    });

    test('Example #5', { tag: ['@F-04-02-001', '@F-04-02-005', '@F-04-02-006', '@権限'] }, async ({ Given, When, Then, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await When('SD_サプライヤー詳細画面（ID=1）にアクセスする', null, { page }); 
      await Then('SD_会社名「大塚商会」が表示されている', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-04/F-04-02-001_header-basic-info.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":10,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then SD_ページタイトル「サプライヤー詳細」が表示されている","stepMatchArguments":[{"group":{"start":11,"value":"サプライヤー詳細","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And SD_会社名「大塚商会」が表示されている","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And SD_ステータスバッジ「有効」が表示されている","stepMatchArguments":[{"group":{"start":12,"value":"有効","children":[]}}]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And SD_コード「SUP-001」が表示されている","stepMatchArguments":[{"group":{"start":7,"value":"SUP-001","children":[]}}]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And SD_評価「0.0」が表示されている","stepMatchArguments":[{"group":{"start":6,"value":"0.0","children":[]}}]}]},
  {"pwTestLine":20,"pickleLine":19,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=12）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"12","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":22,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then SD_ステータスバッジ「停止中」が表示されている","stepMatchArguments":[{"group":{"start":12,"value":"停止中","children":[]}}]}]},
  {"pwTestLine":25,"pickleLine":24,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":27,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then SD_基本情報タブが選択されている","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And SD_会社情報セクションが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":31,"pickleLine":30,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":33,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then SD_会社情報「会社名」に「大塚商会」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"会社名","children":[]}},{"group":{"start":14,"value":"大塚商会","children":[]}}]},{"pwStepLine":34,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"And SD_会社情報「コード」に「SUP-001」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"コード","children":[]}},{"group":{"start":14,"value":"SUP-001","children":[]}}]}]},
  {"pwTestLine":37,"pickleLine":36,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":37,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":39,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then SD_会社情報「会社名（カナ）」に「-」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"会社名（カナ）","children":[]}},{"group":{"start":18,"value":"-","children":[]}}]},{"pwStepLine":40,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"And SD_会社情報「住所」に「-」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"住所","children":[]}},{"group":{"start":13,"value":"-","children":[]}}]},{"pwStepLine":41,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"And SD_会社情報「ウェブサイト」に「-」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"ウェブサイト","children":[]}},{"group":{"start":17,"value":"-","children":[]}}]},{"pwStepLine":42,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"And SD_会社情報「支払条件」に「-」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"支払条件","children":[]}},{"group":{"start":15,"value":"-","children":[]}}]},{"pwStepLine":43,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"And SD_会社情報「備考」に「-」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"備考","children":[]}},{"group":{"start":13,"value":"-","children":[]}}]}]},
  {"pwTestLine":46,"pickleLine":45,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":46,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":48,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then SD_連絡先セクションが表示されている","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"And SD_連絡先カードが 2 件表示されている","stepMatchArguments":[{"group":{"start":11,"value":"2","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":52,"pickleLine":51,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":52,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":54,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then SD_連絡先「松本 健太」に主担当バッジが表示されている","stepMatchArguments":[{"group":{"start":7,"value":"松本 健太","children":[]}}]},{"pwStepLine":55,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And SD_連絡先「松本 健太」の部署が「法人営業部」である","stepMatchArguments":[{"group":{"start":7,"value":"松本 健太","children":[]}},{"group":{"start":18,"value":"法人営業部","children":[]}}]},{"pwStepLine":56,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"And SD_連絡先「松本 健太」に電話番号が表示されている","stepMatchArguments":[{"group":{"start":7,"value":"松本 健太","children":[]}}]},{"pwStepLine":57,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"And SD_連絡先「松本 健太」にメールアドレスが表示されている","stepMatchArguments":[{"group":{"start":7,"value":"松本 健太","children":[]}}]}]},
  {"pwTestLine":60,"pickleLine":59,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":62,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then SD_連絡先「岡田 由美」に主担当バッジが表示されていない","stepMatchArguments":[{"group":{"start":7,"value":"岡田 由美","children":[]}}]}]},
  {"pwTestLine":65,"pickleLine":64,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":65,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":67,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When SD_「製品」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"製品","children":[]}}]},{"pwStepLine":68,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then SD_タブコンテンツが表示されている","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"When SD_「契約」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"契約","children":[]}}]},{"pwStepLine":70,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then SD_タブコンテンツが表示されている","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":70,"keywordType":"Action","textWithKeyword":"When SD_「評価履歴」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"評価履歴","children":[]}}]},{"pwStepLine":72,"gherkinStepLine":71,"keywordType":"Outcome","textWithKeyword":"Then SD_タブコンテンツが表示されている","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":72,"keywordType":"Action","textWithKeyword":"When SD_「認証」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"認証","children":[]}}]},{"pwStepLine":74,"gherkinStepLine":73,"keywordType":"Outcome","textWithKeyword":"Then SD_タブコンテンツが表示されている","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":74,"keywordType":"Action","textWithKeyword":"When SD_「基本情報」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"基本情報","children":[]}}]},{"pwStepLine":76,"gherkinStepLine":75,"keywordType":"Outcome","textWithKeyword":"Then SD_タブコンテンツが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":79,"pickleLine":78,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":79,"keywordType":"Context","textWithKeyword":"Given SD_テスト用サプライヤー（連絡先なし）が作成されている","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":80,"keywordType":"Context","textWithKeyword":"And SD_テスト用サプライヤー詳細画面にアクセスしている","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"Then SD_連絡先空状態メッセージが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":87,"pickleLine":91,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":85,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":89,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When SD_サプライヤー詳細画面（ID=1）にアクセスする","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":90,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"Then SD_会社名「大塚商会」が表示されている","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]}]},
  {"pwTestLine":93,"pickleLine":92,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":85,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":95,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When SD_サプライヤー詳細画面（ID=1）にアクセスする","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":96,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"Then SD_会社名「大塚商会」が表示されている","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]}]},
  {"pwTestLine":99,"pickleLine":93,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":100,"gherkinStepLine":85,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":101,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When SD_サプライヤー詳細画面（ID=1）にアクセスする","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":102,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"Then SD_会社名「大塚商会」が表示されている","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]}]},
  {"pwTestLine":105,"pickleLine":94,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":106,"gherkinStepLine":85,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":107,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When SD_サプライヤー詳細画面（ID=1）にアクセスする","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":108,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"Then SD_会社名「大塚商会」が表示されている","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]}]},
  {"pwTestLine":111,"pickleLine":95,"tags":["@F-04-02-001","@F-04-02-005","@F-04-02-006","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":112,"gherkinStepLine":85,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":113,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When SD_サプライヤー詳細画面（ID=1）にアクセスする","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":114,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"Then SD_会社名「大塚商会」が表示されている","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]}]},
]; // bdd-data-end