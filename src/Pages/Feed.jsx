import { toast } from 'react-toastify';

const Feed = () => {
    const logout = async () => {
        try {
            await fetch('/logout', { method: 'POST', credentials: 'include' });
            toast.success("Logged out successfully");
            window.location.href = '/';
        } catch (error) {
            toast.error("Logout failed");
            console.error("Logout failed:", error);
        }
    };

    return (
        <>
            <p>This is Feed page.</p>
            <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>
        </>
    )
}

export default Feed;