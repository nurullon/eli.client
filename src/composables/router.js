import {useRoute, useRouter} from 'vue-router'
import {computed, ref, watch} from "vue";

export function useQueryParams() {
    const route = useRoute()
    const router = useRouter()

    const getQueries = () => {
        const queries = {...route?.query}
        queries.page = route?.query.page ? +route.query.page - 1 : 0
        queries.size = route?.query.size ? +route.query.size : 10

        return queries
    }
    const setQueries = async ({...props}) => {
        await router.push({
            query: Object.assign({...route?.query}, props)
        })
    }
    return {
        getQueries,
        setQueries
    }
}

export const useRouterHistoryCounter = () => {
    const router = useRouter()
    const route = useRoute()
    const query = computed(() => route.query)
    const counter = ref(0)

    watch(
        query,
        () => {
            counter.value--
        },
        {
            deep: true,
            immediate: true
        }
    )

    function back() {
        router.go(counter.value)
    }

    return {
        back
    }
}

