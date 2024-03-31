// directory: C:\cplusplusfiles\ebayclone\app\hooks\useIsLoading.js
const useIsLoading = (bool) => {
    localStorage.setItem('isLoading', bool)
    window.dispatchEvent(new Event("storage"));
}

export default useIsLoading;