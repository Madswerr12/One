<!-- Aqui las visualizaciones de las cards-->
<template>
    <div class="blog-wrapper no-user">
        <div class="blog-content">
            <div>
              
                <h1 class="welcome-title" v-if="post.welcomeScreen">{{ post.title }}</h1>
                <h1 v-else>{{ post.blogtitle }}</h1>

                <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
                <p class="content-preview" v-else v-html="post.blogHTML"></p>
                <router-link class="link link-light" v-if="post.welcomeScreen" to="#">
                    Login
                    <Arrow class="arrow arrow-light" />
                </router-link>
                <router-link class="link" v-else :to="{ name: 'ViewBlog', params: { blogid: this.post.blogID } }">
                    Ver ahora
                    <Arrow class="arrow" />
                </router-link>
            </div>
        </div>
        <div class="blog-photo">
            <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt="" />
            <img v-else :src="post.blogCoverPhoto" alt="" />
        </div>
    </div>
</template>

<!-- Aqui las los metodos-->


<script>

import Arrow from "../assets/Icons/arrow-right-light.svg";

export default {
    name: "blogPost",
    props: ["post"],
    components: {
        Arrow,
    }
};
</script>

<!-- Aqui las los estilos-->

<style lang="scss" scoped>
.blog-wrapper {
    display: flex;
    flex-direction: column;
  

    @media (min-width:700px) {
        min-height: 650px;
        max-height: 650px;
        flex-direction: row;
    }

    .blog-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 4;
        order: 2;

        @media (min-width:700px) {
            order: 1;
        }

        @media (min-width:800px) {
            flex: 3;
        }

        div {
            max-width: 375px;
            padding: 72px 24px;

            @media (min-width:700px) {
                padding: 0 24px;
            }

            h2 {
                font-family: 32px;
                font-weight: 300;
                text-transform: uppercase;
                margin-bottom: 24px;

                @media (min-width:700px) {
                    font-size: 40px;
                }
            }

            p{
                font-size: 15px;
                font-weight:300 ;
                line-height: 1.7;
            }
            .content-preview{
                font-size: 13px;
                max-height: 24px;
                width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

            }

            .link{
                display: inline-flex;
                align-items: center;
                margin-top: 32px;
                padding-bottom: 4px;
                border-bottom: 1px solid transparent;
                transition:  .5s ease-in all;
                
                &:hover{
                    border-bottom-color: #303030;

                }
            }

            .link-light{
                &:hover{
                    border-bottom-color: #fff;
                }
            }

        }



    }
    .blog-photo{
        order: 1;
        flex: 3;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba (0, 0, 0, 0.06);

        @media (min-width:700px)  {
            order: 2;
            
        }
        @media (min-width:700px)  {
           flex: 4;
            
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;

        }

    }
    &:nth-child(even)
    .blog-content{
        order: 2;
    }
    .blog-photo{
        order: 1;
    }
}

.no-user:first-child{
    .blog-content{
        background: radial-gradient(circle at 10% 20%, rgb(69, 86, 102) 0%, rgb(34, 34, 34) 90%);

        color: #fff;
    }
}
</style>
