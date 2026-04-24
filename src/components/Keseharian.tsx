import { useState, useEffect } from 'react';
import { BookOpen, ListTodo, NotebookPen, Check, X, Plus } from 'lucide-react';

type Todo = {
    id: string;
    text: string;
    done: boolean;
};

export default function KeseharianView() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [notes, setNotes] = useState('');

    // Load initial data
    useEffect(() => {
        const savedTodos = localStorage.getItem('hitera_todos');
        const savedNotes = localStorage.getItem('hitera_notes');
        if (savedTodos) setTodos(JSON.parse(savedTodos));
        if (savedNotes) setNotes(savedNotes);
    }, []);

    // Save changes
    useEffect(() => {
        localStorage.setItem('hitera_todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        localStorage.setItem('hitera_notes', notes);
    }, [notes]);

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        setTodos([{ id: Date.now().toString(), text: newTodo, done: false }, ...todos]);
        setNewTodo('');
    };

    const toggleTodo = (id: string) => {
        setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '40px', height: '100%' }}>

            <header className="page-header">
                <div className="page-header-icon">
                    <BookOpen size={32} />
                </div>
                <div>
                    <h1 className="page-title">Pencatatan Keseharian</h1>
                    <p className="page-subtitle">Kelola tugas harian dan jadikan pikiran Anda lebih terstruktur melalu jurnal.</p>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) minmax(400px, 1.2fr)', gap: '32px', alignItems: 'stretch' }}>

                {/* To-Do List */}
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', maxHeight: '75vh' }}>
                    <h2 style={{ fontSize: '22px', marginBottom: '24px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ListTodo size={24} color="var(--success)" /> Tugas Hari Ini
                    </h2>

                    <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Tambahkan tugas baru..."
                            className="styled-input"
                        />
                        <button type="submit" className="styled-button" style={{ width: 'auto', padding: '0 24px', borderRadius: '12px' }}>
                            <Plus size={20} />
                        </button>
                    </form>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', paddingRight: '8px', flex: 1 }}>
                        {todos.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                                <Check size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
                                <p>Belum ada rincian tugas. Bersantai atau mulai tambahkan!</p>
                            </div>
                        ) : (
                            todos.map(todo => (
                                <div key={todo.id} style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px',
                                    opacity: todo.done ? 0.5 : 1, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', flex: 1 }} onClick={() => toggleTodo(todo.id)}>
                                        <div style={{
                                            width: '28px', height: '28px', borderRadius: '8px',
                                            border: `2px solid ${todo.done ? 'var(--success)' : 'var(--accent-hover)'}`,
                                            background: todo.done ? 'var(--success)' : 'rgba(255,255,255,0.05)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
                                        }}>
                                            {todo.done && <Check size={16} color="white" strokeWidth={3} />}
                                        </div>
                                        <span style={{
                                            textDecoration: todo.done ? 'line-through' : 'none',
                                            fontSize: '16px', color: todo.done ? 'var(--text-secondary)' : 'var(--text-primary)',
                                            transition: 'all 0.2s'
                                        }}>{todo.text}</span>
                                    </div>
                                    <button onClick={() => deleteTodo(todo.id)} className="icon-btn danger" style={{ padding: '8px' }} title="Hapus Tugas">
                                        <X size={20} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Journal / Notes */}
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                        <div>
                            <h2 style={{ fontSize: '22px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <NotebookPen size={24} color="var(--accent-hover)" /> Jurnal / Catatan
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                Ruang bebas reflektif. Tuliskan pemikiran dan ide penting.
                            </p>
                        </div>
                    </div>

                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="styled-input"
                        placeholder="Mulailah mengetik jurnal kehidupan Anda di sini..."
                        style={{
                            flex: 1, minHeight: '400px', resize: 'none',
                            fontFamily: 'Outfit, inherit', fontSize: '16px', lineHeight: '1.8',
                            padding: '24px', background: 'rgba(0,0,0,0.2)',
                            border: 'none', borderRadius: '16px', boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.3)'
                        }}
                    />
                </div>

            </div>
        </div>
    );
}
