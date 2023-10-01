import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Aside from './layouts/Aside/Aside';
import Main from './layouts/Main/Main';
import { useLocalStorage } from './hooks/useLocalStorage.hook';
import { UserContextProvider } from './context/user.context';

const mapItems = items => {
    if (!items.length) {
        return [];
    }
    return items.map(i => ({
        ...i,
        date: new Date(i.date)
    }));
};

function App() {
    const [items, setItems] = useLocalStorage('data');
    const [selectedItem, setSelectedItem] = useState(null);

    const addItem = item => {
        if (!item.id) {
            setItems([...mapItems(items), {
                ...item,
                id: items.length ? Math.max(...items.map(i => i.id)) + 1 : 1
            }]);
        }
        else {
            setItems([...mapItems(items)].map(el => {
                if (el.id === item.id) {
                    return { ...item };
                }
                return el;
            }));
        }
    };

    const deleteItem = id => {
        if (id) {
            setItems([...mapItems(items)].filter(item => item.id !== id));
        }
    };

    useEffect(() => {
        if (items.length) {
            setItems(items);
        }
    }, [items]);

    return (
        <UserContextProvider>
            <div className="app">
                <Aside>
                    <Header/>
                    <JournalAddButton clearForm={() => setSelectedItem(null)}/>
                    <JournalList items={mapItems(items)} setItem={setSelectedItem}/>
                </Aside>

                <Main>
                    <JournalForm data={selectedItem} onSubmit={addItem} onDelete={deleteItem}/>
                </Main>
            </div>
        </UserContextProvider>
    );
}

export default App;
