import create from 'zustand';

interface SelectContentState {
  selectContent: number;
  setSelectContent: (select: number) => void;
}

export const useStore = create<SelectContentState>((set) => ({
  selectContent: window.localStorage.getItem('select')
    ? Number(window.localStorage.getItem('select'))
    : 0,
  setSelectContent: (select) => {
    set((state) => ({ ...state, selectContent: select }));
  },
}));

export default useStore;
