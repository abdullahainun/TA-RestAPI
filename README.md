# Analis Traffic DNS - RestAPI

Author : Ainun Abdullah abdullah.ainun4@gmail.com

# fitur api

- connection logs

  - menampilkan semua data connection logs

  ```http://localhost:9090/api/connlogs

  ```

  - filter connection logs by date range

  ```http://localhost:9090/api/connlogs

  ```

- DNS Logs

  - Mendapatkan Semua data DNS Logs

    ```http://localhost:9090/api/dnslogs

    ```

  - Mendapatkan Top Query

        ```http://localhost:9090/api/dnslogs/queries

        ```

    - Menampilkan http://localhost:9090/api/dnslogs/rcodes

    - Medapatkan qclasese http://localhost:9090/api/dnslogs/qclases

\* \*


db.classifications.aggregate(
    [{
        $project: {
            label: {
                $cond: {
                    if: {
                        $gte: ["$label", "0.0"]
                    },
                    then: "normal",
                    else: "malicious"
                }
            }
        }
    }]
)
