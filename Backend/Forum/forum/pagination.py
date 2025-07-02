from rest_framework.pagination import PageNumberPagination

class FiveOnPage(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'size'
    max_page_size = 4

class SixOnPage(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'size'
    max_page_size = 6