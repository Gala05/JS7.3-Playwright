const { test, expect } = require("@playwright/test");
const { login, pass } = require("../user.js");

test("Успешная авторизация", async ({ page }) => {  
  await page.goto("https://netology.ru");
  await page.screenshot({path: `./screenshot/screenshot-success1.png`});
  await page.click('text=Войти');
  await page.screenshot({path: `./screenshot/screenshot-success2.png`});
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', login);
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', pass);  
  await page.click('[data-testid="login-submit-btn"]');
  await page.screenshot({path: `./screenshot/screenshot-success3.png`});
  await expect(page.getByRole('heading', { name: 'Моё обучение' })).toBeVisible();  
});

test("Неуспешная авторизация", async ({ page }) => {  
  await page.goto("https://netology.ru");
  await page.screenshot({path: `./screenshot/screenshot-unsuccess1.png`});
  
  await page.click('text=Войти');
  await page.screenshot({path: `./screenshot/screenshot-unsuccess2.png`});
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', 'login123@mail.ru');
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', "pass010");  
  await page.click('[data-testid="login-submit-btn"]');
  await page.screenshot({path: `./screenshot/screenshot-unsuccess3.png`});
  await expect(page.locator('[data-testid="login-error-hint"]')).toContainText("Вы ввели неправильно логин или пароль")
});