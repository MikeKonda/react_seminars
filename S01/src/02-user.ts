// Задание 2. Карточка пользователя (15 минут)
//
// 1. Реализуйте describeUser.
// 2. Отсутствующий возраст не должен превращаться в "undefined лет".
// 3. Контакт различайте оператором in, а не проверкой на undefined.
// 4. Пустой массив хобби обработайте отдельной фразой.
//
// Без any, as и !.

export type Contact = { email: string } | { phone: string };

export type User = {
    name: string;
    age?: number;
    hobbies: string[];
    contact: Contact;
};

export function describeUser(user: User): string {
    let age = user.age == undefined ? "unknown" : user.age;
    let hobbies = user.hobbies.length == 0 ? "unknown" : user.hobbies;
    let contact = 'email' in user.contact ? user.contact.email : user.contact.phone;
    return `Name: ${user.name}\nAge: ${age}\nHobbies: ${hobbies}\nContact: ${contact}`;
}
