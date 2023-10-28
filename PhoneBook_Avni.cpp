#include <iostream>
#include <string>
#include <stack>

using namespace std;

struct Contact {
    string name;
    string number;
};

class PhoneBook {
private:
    stack<Contact> contacts;

public:
    bool isValidPhoneNumber(const string& number) {
        return number.length() == 10 && all_of(number.begin(), number.end(), ::isdigit);
    }

    void addContact(const string& name, const string& number) {
        if (!name.empty() && isValidPhoneNumber(number)) {
            contacts.push({name, number});
        } else {
            cout << "Please enter a valid 10-digit phone number." << endl;
        }
    }

    void searchContacts(const string& searchValue, const string& searchOption) {
        bool found = false;
        stack<Contact> tempStack;

        while (!contacts.empty()) {
            Contact contact = contacts.top();
            contacts.pop();

            if ((searchOption == "name" && contact.name.find(searchValue) != string::npos) ||
                (searchOption == "number" && contact.number.find(searchValue) != string::npos)) {
                cout << "Name: " << contact.name << endl;
                cout << "Number: " << contact.number << endl;
                found = true;
            }
            tempStack.push(contact);
        }

        while (!tempStack.empty()) {
            contacts.push(tempStack.top());
            tempStack.pop();
        }

        if (!found) {
            cout << "No matching contacts found." << endl;
        }
    }

    void deleteContact() {
        string contactName;
        cout << "Enter the name of the contact you want to delete: ";
        cin >> contactName;

        bool contactFound = false;
        stack<Contact> tempStack;

        while (!contacts.empty()) {
            Contact contact = contacts.top();
            contacts.pop();

            if (contact.name == contactName) {
                contactFound = true;
                cout<<"This contact has been deleted successfully"<<endl;
                continue; // we are Skiping adding the contact to tempStack (effectively deleting it).
            }

            tempStack.push(contact);
        }

        // Restore the contacts to the original stack.
        while (!tempStack.empty()) {
            contacts.push(tempStack.top());
            tempStack.pop();
        }

        if (!contactFound) {
            cout << "Contact not found." << endl;
        }
    }



    void showPhoneBook() {
        if (contacts.empty()) {
            cout << "Phone book is empty." << endl;
        } else {
            stack<Contact> tempStack = contacts;
            int contactCount = 1;
            while (!tempStack.empty()) {
                Contact contact = tempStack.top();
                tempStack.pop();
                cout<< "******************************************"<<endl;
                cout << "Contact " << contactCount << ":" << endl;
                cout << "Name: " << contact.name << endl;
                cout << "Number: " << contact.number << endl;
                contactCount++;
                cout<< "******************************************"<<endl;
            }
        }
    }
};

int main() {
    PhoneBook phoneBook;
    while (true) {
        cout << "Phone Book App" << endl;
        cout << "1. Add Contact" << endl;
        cout << "2. Search Contacts" << endl;
        cout << "3. Delete Contact" << endl;
        cout << "4. Show Phone Book" << endl;
        cout << "5. Exit" << endl;
        cout << "Choose an option: ";
        int option;
        cin >> option;

        string name, number, searchValue, searchOption;

        switch (option) {
            case 1:
                cout << "Enter Name: ";
                cin >> name;
                cout << "Enter Number: ";
                cin >> number;
                phoneBook.addContact(name, number);
                break;

            case 2:
                cout << "Enter Search Value: ";
                cin >> searchValue;
                cout << "Search by (name/number): ";
                cin >> searchOption;
                phoneBook.searchContacts(searchValue, searchOption);
                break;

            case 3:
                phoneBook.deleteContact();
                break;

            case 4:
                phoneBook.showPhoneBook();
                break;

            case 5:
                return 0;
        }
    }
}
